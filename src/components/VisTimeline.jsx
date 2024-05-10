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
    eventContent,
    eventStart,
    eventEnd,
    onAddAction,
    onRemoveAction,
    onUpdateAction,
    onMoveAction
}) {
    if (!visItems || visItems.status !== "available" || !visItems.items) 
        return <div>Loading Items...</div>;
    else if (!visGroups || visGroups.status !== "available") 
        return <div>Loading Groups...</div>;

    function mapEventItem(item) {
        eventStart.setValue(item.start);
        eventEnd.setValue(item.end);
        eventItemId.setValue(item.id);
        eventContent.setValue(item.content);
    }

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
                mapEventItem(item);
                onAddAction.execute();
            }
        },
        onMove: function (item, callback) {
            if (onMoveAction && onMoveAction.canExecute) {
                mapEventItem(item);
                onMoveAction.execute();
            }
        },
        onUpdate: function (item, callback) {
            if (onUpdateAction && onUpdateAction.canExecute) {
                mapEventItem(item);
                onUpdateAction.execute();
            }
        },
        onRemove: function (item, callback) {
            if (onRemoveAction && onRemoveAction.canExecute) {
                mapEventItem(item);
                onRemoveAction.execute();
            }
        }
    });

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
            showMinorLabels: false
            // groupHeights: groups.map(() => 40)
        }));
    }, [Width.value, Height.value, TimelineStart.value, TimelineEnd.value]);

    // Use Effect for the Editable properties.
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

    return (
        <div>
            <Timeline
                initialGroups={groups.length > 0 ? groups : null}
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
