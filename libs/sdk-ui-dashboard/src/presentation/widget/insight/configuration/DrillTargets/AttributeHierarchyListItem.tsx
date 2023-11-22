// (C) 2023 GoodData Corporation

import React from "react";
import cx from "classnames";

import { stringUtils } from "@gooddata/util";
import { ShortenedText } from "@gooddata/sdk-ui-kit";

import {
    ICatalogAttribute,
    ICatalogAttributeHierarchy,
    ICatalogDateAttribute,
    isCatalogAttribute,
} from "@gooddata/sdk-model";
import {
    AttributeHierarchyDetailBubble,
    AttributeHierarchyDetailPanel,
    IAttributeHierarchyDetailItem,
} from "@gooddata/sdk-ui-ext";
import { selectAllCatalogAttributesMap, useDashboardSelector } from "../../../../../model/index.js";
import { ObjRefMap } from "../../../../../_staging/metadata/objRefMap.js";

/**
 * @internal
 */
export interface IAttributeHierarchyListItemProps {
    item: ICatalogAttributeHierarchy;
    onClick: () => void;
    isSelected?: boolean;
    isDisabled?: boolean;
}

function buildAttributeHierarchyDetailItems(
    hierarchy: ICatalogAttributeHierarchy,
    allCatalogAttributes: ObjRefMap<ICatalogAttribute | ICatalogDateAttribute>,
) {
    const attributeRefs = hierarchy.attributeHierarchy.attributes;
    const items: IAttributeHierarchyDetailItem[] = [];
    attributeRefs.forEach((ref) => {
        const attribute = allCatalogAttributes.get(ref);
        if (attribute) {
            items.push({
                title: attribute.attribute.title,
                isDate: !isCatalogAttribute(attribute),
            });
        }
    });
    return items;
}
export const AttributeHierarchyListItem: React.FC<IAttributeHierarchyListItemProps> = (props) => {
    const { onClick, item, isDisabled } = props;
    const allCatalogAttributes = useDashboardSelector(selectAllCatalogAttributesMap);

    const hierarchyListItemClassname = cx(
        "attribute-hierarchy-list-item s-attribute-hierarchy-list-item",
        `s-${stringUtils.simplifyText(item.attributeHierarchy.title)}`,
        {
            "is-disabled s-is-disable": isDisabled,
        },
    );
    const attributeDetailItems = buildAttributeHierarchyDetailItems(item, allCatalogAttributes);
    return (
        <div className={hierarchyListItemClassname} onClick={onClick}>
            <div className="attribute-hierarchy-list-item-content s-attribute-hierarchy-list-item-content">
                <ShortenedText className="attribute-hierarchy-title s-attribute-hierarchy-title">
                    {item.attributeHierarchy.title}
                </ShortenedText>
            </div>

            <div className="attribute-hierarchy-list-item-description s-attribute-hierarchy-list-item-description">
                <AttributeHierarchyDetailBubble>
                    <AttributeHierarchyDetailPanel
                        title={item.attributeHierarchy.title}
                        attributes={attributeDetailItems}
                    />
                </AttributeHierarchyDetailBubble>
            </div>
        </div>
    );
};
