import { createElement } from "react";

import { VisTimeline } from "./components/VisTimeline";
import "./ui/ReactVisTimeline.css";

export function ReactVisTimeline({ 
    Width, 
    Height, 
    TimelineStart, 
    TimelineEnd, 
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
    onMoveAction}) {

    return <VisTimeline 
        visItems={visItems}
        ItemID={ItemID}
        ItemContent={ItemContent}
        Start={Start}
        End={End}
        ItemType={ItemType}
        ClassName={ClassName}
        Description={Description}
        IsRemove={IsRemove}
        IsUpdateGroup={IsUpdateGroup}
        IsUpdateTime={IsUpdateTime}
        Group={Group}
        visGroups={visGroups}
        GroupID={GroupID}
        GroupContent={GroupContent}
        TimelineStart={TimelineStart}
        TimelineEnd={TimelineEnd}
        Height={Height}
        Width={Width}
        NestedGroups={NestedGroups}
        TreeLevel={TreeLevel} 
        optionsAdd={optionsAdd}
        optionsRemove={optionsRemove}
        optionsUpdateGroup={optionsUpdateGroup}
        optionsUpdateTime={optionsUpdateTime}
        optionsOverrideItems={optionsOverrideItems}
        isSnap={isSnap}
        eventItemId={eventItemId}
        eventContent={eventContent}
        eventStart={eventStart}
        eventEnd={eventEnd}
        onAddAction={onAddAction}
        onRemoveAction={onRemoveAction}
        onUpdateAction={onUpdateAction}
        onMoveAction={onMoveAction}/>;
}
