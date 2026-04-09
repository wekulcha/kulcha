import { BASE_URL } from "./baseUrl";
import { buildAdminApiJsonHeaders } from "../telegram/initTelegram";

export type StaffPermission = "CAN_EDIT_MENU" | "CAN_LOOK_ORDERS";

export interface StaffMember {
  staffId: number;
  userId: number;
  username: string;
  phone: string;
  permission: StaffPermission;
}

/** Backend StaffMemberDto (camelCase) */
interface StaffMemberDto {
  staffId: number;
  userId: number;
  username: string;
  phone: string;
  permission: StaffPermission;
}

function toMember(d: StaffMemberDto): StaffMember {
  return {
    staffId: d.staffId,
    userId: d.userId,
    username: d.username,
    phone: d.phone,
    permission: d.permission,
  };
}

export async function fetchRestaurantStaff(restaurantId: number): Promise<StaffMember[]> {
  const resp = await fetch(`${BASE_URL}/restaurants/${restaurantId}/staff`, {
    headers: buildAdminApiJsonHeaders(),
  });
  if (!resp.ok) throw new Error(`Failed to load staff: ${resp.status}`);
  const data = (await resp.json()) as StaffMemberDto[];
  return data.map(toMember);
}

export async function addRestaurantStaff(
  restaurantId: number,
  telegramId: number,
  permission: StaffPermission
): Promise<StaffMember> {
  const resp = await fetch(`${BASE_URL}/restaurants/${restaurantId}/staff`, {
    method: "POST",
    headers: buildAdminApiJsonHeaders(),
    body: JSON.stringify({ telegramId, permission }),
  });
  if (!resp.ok) throw new Error(`Failed to add staff: ${resp.status}`);
  const d = (await resp.json()) as StaffMemberDto;
  return toMember(d);
}

export async function removeRestaurantStaff(
  restaurantId: number,
  staffId: number
): Promise<void> {
  const resp = await fetch(`${BASE_URL}/restaurants/${restaurantId}/staff/${staffId}`, {
    method: "DELETE",
    headers: buildAdminApiJsonHeaders(),
  });
  if (!resp.ok) throw new Error(`Failed to remove staff: ${resp.status}`);
}
