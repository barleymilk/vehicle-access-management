export interface Vehicle {
  id: string;
  plate_number: string;
  vehicle_type: string;
  is_public_vehicle: boolean;
  access_period: string;
  note: string;
  is_free_pass_enabled: boolean;
}

export interface Driver {
  id: string;
  name: string;
  org_dept_pos?: string;
  organization?: string;
  department?: string;
  position?: string;
  phone?: string;
  activity_period?: string;
  vip_level?: string;
  contact_person_name?: string;
  contact_person_phone?: string;
}
