// (C) 2021-2023 GoodData Corporation
import { IGranteeEntry, IGranteeUserGroupInfo, IGranteeUserInfo } from "@gooddata/api-model-bear";

import { convertWorkspaceUserGroup } from "./UserGroupsConverter.js";
import { convertUsersItem } from "./UsersConverter.js";
import {
    AccessGranteeDetail,
    IGranularAccessGrantee,
    IAvailableUserAccessGrantee,
    IAvailableUserGroupAccessGrantee,
    IWorkspaceUser,
    IWorkspaceUserGroup,
    IAccessGrantee,
    isGranularUserAccessGrantee,
} from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";

function isGranteeUserInfo(grantee: IGranteeUserInfo | IGranteeUserGroupInfo): grantee is IGranteeUserInfo {
    return !isEmpty(grantee) && (grantee as IGranteeUserInfo).user !== undefined;
}

export const convertGranteeEntry = (item: IGranteeEntry): AccessGranteeDetail => {
    if (isGranteeUserInfo(item.aclEntry.grantee)) {
        return {
            type: "user",
            user: convertUsersItem(item.aclEntry.grantee.user),
        };
    } else {
        return {
            type: "group",
            userGroup: convertWorkspaceUserGroup(item.aclEntry.grantee.userGroup),
        };
    }
};

export const mapUserFullName = (user: IWorkspaceUser): string => {
    if (user.fullName) {
        return user.fullName;
    }

    return `${user.firstName} ${user.lastName}`;
};

export const convertWorkspaceUserToAvailableUserAccessGrantee = (
    user: IWorkspaceUser,
): IAvailableUserAccessGrantee => ({
    type: "user",
    ref: user.ref,
    name: mapUserFullName(user),
    email: user.email,
    status: user.status ?? "DISABLED",
});

export const convertWorkspaceUserGroupToAvailableUserGroupAccessGrantee = (
    group: IWorkspaceUserGroup,
): IAvailableUserGroupAccessGrantee => ({
    type: "group",
    ref: group.ref,
    name: group.name ?? "",
});

export const convertGranularAccessGranteeToAcessGrantee = (
    grantee: IGranularAccessGrantee,
): IAccessGrantee => {
    if (grantee.type === "allWorkspaceUsers") {
        return grantee;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { permissions, inheritedPermissions, ...rest } = grantee;
    const type = isGranularUserAccessGrantee(grantee) ? "user" : "group";

    return { ...rest, type };
};
