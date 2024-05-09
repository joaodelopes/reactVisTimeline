import React, { useState, createElement, useEffect } from "react";
import Timeline from "react-vis-timeline";
import "../ui/ReactVisTimeline.css";

export function VisTimeline({
    visItems,
    ItemID,
    ItemContent,
    Start,
    End,
    ItemType,
    ClassName,
    Description,
    IsRemove,
    IsUpdateGroup,
    IsUpdateTime,
    Group,
    visGroups,
    GroupID,
    GroupContent,
    TimelineStart,
    TimelineEnd,
    Height,
    Width,
    NestedGroups,
    TreeLevel,
    optionsAdd,
    optionsRemove,
    optionsUpdateGroup,
    optionsUpdateTime,
    optionsOverrideItems,
    isSnap, 
    eventItemId,
    eventStart,
    eventEnd,
    onAddAction
}) {

    if (!visItems || visItems.status !== "available" || !visItems.items) 
      return <div>Loading Items...</div>;
    else if (!visGroups || visGroups.status !== "available" || !visGroups.items) 
      return <div>Loading Groups...</div>;

    // Definition of groups and TimelineOptions
    const [groups, setGroups] = useState([]);
    const [timelineOptions, setTimelineOptions] = useState({
        width: Width.value ? Width.value : null,
        height: Height.value ? Height.value : null, // height: Height.value === '' ? null : Height.value,
        start: TimelineStart.value ? TimelineStart.value : null,
        end: TimelineEnd.value ? TimelineEnd.value : null,
        editable: {
            add: optionsAdd.value,
            remove: optionsRemove.value,
            updateGroup: optionsUpdateGroup.value,
            updateTime: optionsUpdateTime.value,
            overrideItems: optionsOverrideItems.value
        },
        snap: !isSnap.value
            ? null // always snap to full hours, independent of the scale
            : function (date, scale, step) {
                  var hour = 60 * 60 * 1000;
                  return Math.round(date / hour) * hour;
              },
        zoomable: false,
        showMinorLabels: false,
        moveable: false,
        groupOrder: "order",
        onAdd: function (item, callback) {
          if (onAddAction && onAddAction.canExecute) {
            eventStart.value = item.start;
            eventEnd.value = item.end;
            onAddAction.execute();
          }
        },
    });




    // Storing all the items
    // let items = visItems.items.map(item => ({
    //     id: ItemID.get(item).value,
    //     start: Start.get(item).value,
    //     end: End.get(item).value,
    //     content: ItemContent.get(item).value,
    //     className: ClassName.get(item).value,
    //     editable: {
    //         updateTime: IsUpdateTime.get(item).value,
    //         updateGroup: IsUpdateGroup.get(item).value,
    //         remove: IsRemove.get(item).value
    //     },
    //     type: ItemType.get(item).value,
    //     group: Group.get(item).displayValue,
    //     ClassName: ClassName.get(item).value,
    //     Description: Description.get(item).value
    // }));

    // The useEffect will occur when any value of the array changes, to help on the refresh of the widget that sometimes was failing
    useEffect(() => {
        setGroups(
            visGroups.items.map((item, index) => ({
                id: GroupID.get(item).value,
                content: GroupContent.get(item).value,
                treeLevel: TreeLevel.get(item).value,
                nestedGroups: NestedGroups.get(item).value === "" ? null : JSON.parse(NestedGroups.get(item).value),
                order: index
            }))
        );

        setTimelineOptions(prevOptions => ({
            ...prevOptions,
            width: Width.value ? Width.value : null,
            height: Height.value ? Height.value : null, // height: Height.value === '' ? null : Height.value,
            start: TimelineStart.value ? TimelineStart.value : null,
            end: TimelineEnd.value ? TimelineEnd.value : null,
            editable: {
                add: optionsAdd.value,
                remove: optionsRemove.value,
                updateGroup: optionsUpdateGroup.value,
                updateTime: optionsUpdateTime.value,
                overrideItems: optionsOverrideItems.value
            },
            snap: !isSnap.value
                ? null // always snap to full hours, independent of the scale
                : function (date, scale, step) {
                      var hour = 60 * 60 * 1000;
                      return Math.round(date / hour) * hour;
                  },
            zoomable: false,
            showMinorLabels: false,
            groupHeights: groups.map(() => 40)
        }));
    }, [visGroups.items, Width.value, Height.value, TimelineStart.value, TimelineEnd.value]);

    useEffect(() => {
        setTimelineOptions(prevOptions => ({
            ...prevOptions,
            editable: {
                add: optionsAdd.value,
                remove: optionsRemove.value,
                updateGroup: optionsUpdateGroup.value,
                updateTime: optionsUpdateTime.value,
                overrideItems: optionsOverrideItems.value
            }
        }));
    }, [
        optionsAdd.value,
        optionsRemove.value,
        optionsUpdateGroup.value,
        optionsUpdateTime.value,
        optionsOverrideItems.value
    ]);

    // When the number of items is reduced, it's helping on the refresh that sometimes was failing
    useEffect(() => {
        if (items.length < 40) {
            // Update the timelineOptions when an attribute changes
            setTimeout(() => {
                // Force a reflow
                document.body.offsetWidth;
                setGroups(
                    visGroups.items.map((item, index) => ({
                        id: GroupID.get(item).value,
                        content: GroupContent.get(item).value,
                        treeLevel: TreeLevel.get(item).value,
                        nestedGroups:
                            NestedGroups.get(item).value === "" ? null : JSON.parse(NestedGroups.get(item).value),
                        order: index
                    }))
                );

                setTimelineOptions(prevOptions => ({
                    ...prevOptions,
                    width: Width.value ? Width.value : null,
                    height: Height.value ? Height.value : null, // height: Height.value === '' ? null : Height.value,
                    start: TimelineStart.value ? TimelineStart.value : null,
                    end: TimelineEnd.value ? TimelineEnd.value : null,
                    // snap: !isSnap.value
                    //     ? null // always snap to full hours, independent of the scale
                    //     : function (date, scale, step) {
                    //           var hour = 60 * 60 * 1000;
                    //           return Math.round(date / hour) * hour;
                    //       },
                    // zoomable: false,
                    // showMinorLabels: false,
                    groupHeights: groups.map(() => 40)
                }));
            }, 200);
        }
    }, [items.length, Width.value, Height.value, TimelineStart.value, TimelineEnd.value]);

    return (
        <div>
            <Timeline
                initialGroups={groups}
                options={timelineOptions}
                initialItems={visItems.items.map(item => ({
                  id: ItemID.get(item).value,
                  start: Start.get(item).value,
                  end: End.get(item).value,
                  content: ItemContent.get(item).value,
                  className: ClassName.get(item).value,
                  editable: {
                      updateTime: IsUpdateTime.get(item).value,
                      updateGroup: IsUpdateGroup.get(item).value,
                      remove: IsRemove.get(item).value
                  },
                  type: ItemType.get(item).value,
                  group: Group.get(item).displayValue,
                  ClassName: ClassName.get(item).valuke,
                  Description: Description.get(item).value
                    // title: `${Description.get(item).value}` // Include the tooltip content in the title property
                }))}
                // itemTouchSendsClick={false}
            />
        </div>
    );
}
