import type { PostMemberPayload, PostMemberPerson } from '@/types/api/member';
import type { MemberAddress, MemberForm, MemberRelatedPerson } from '@/types/ui/members';
import moment from 'moment';
import { DATE_FORMAT_DB } from '..';

export function mapMemberFormToPostMemberPayload(memberForm: MemberForm): PostMemberPayload {
  const postMemberPayload: PostMemberPayload = {
    surname: memberForm.surname ?? '',
    first_name: memberForm.first_name ?? '',
    middle_name: memberForm.middle_name ?? '',
    name_extension: memberForm.name_extension ?? '',
    date_of_birth: moment(memberForm.date_of_birth).format(DATE_FORMAT_DB),
    place_of_birth: memberForm.place_of_birth ?? '',
    gender: memberForm.gender ?? '',
    date_hired: moment(memberForm.date_hired).format(DATE_FORMAT_DB),
    department: memberForm.department ?? '',
    position: memberForm.position ?? '',
    employee_no: memberForm.employee_no ?? '',
    tin_no: memberForm.tin_no ?? '',
    email_address: memberForm.email_address ?? '',
    member_at: memberForm.member_at ?? '',
    mobile_number: memberForm.mobile_number ?? '',
    telephone_number: memberForm.telephone_number ?? '',
    oriented: memberForm.oriented ?? false,
    permanent_address: mapMemberAddressPermanent(memberForm.permanent_address),
    present_address: mapMemberAddressPresent(memberForm.present_address),
    father: mapMemberRelatedPerson(memberForm.father),
    mother: mapMemberRelatedPerson(memberForm.mother),
    spouse: mapMemberRelatedPerson(memberForm.spouse),
    beneficiaries: memberForm.beneficiaries.map((r) => ({
      ...r,
      birthdate: moment(r.birthdate).format(DATE_FORMAT_DB),
    })),
  };

  return postMemberPayload;
}

function mapMemberAddressPresent(memberAddress: MemberAddress | undefined): PostMemberPayload['present_address'] {
  if (!memberAddress) {
    return undefined;
  }

  return {
    house_block_lot: memberAddress.house_block_lot ?? '',
    street: memberAddress.street ?? '',
    subdivision_village: memberAddress.subdivision_village ?? '',
    barangay: memberAddress.barangay ?? '',
    city_municipality: memberAddress.city_municipality ?? '',
    province: memberAddress.province ?? '',
    zip_code: memberAddress.zip_code ?? '',
    residency_status: memberAddress.residency_status ?? '',
  };
}

function mapMemberAddressPermanent(memberAddress: MemberAddress | undefined): PostMemberPayload['permanent_address'] {
  if (!memberAddress) {
    return undefined;
  }

  return {
    house_block_lot: memberAddress.house_block_lot ?? '',
    street: memberAddress.street ?? '',
    subdivision_village: memberAddress.subdivision_village ?? '',
    barangay: memberAddress.barangay ?? '',
    city_municipality: memberAddress.city_municipality ?? '',
    province: memberAddress.province ?? '',
    zip_code: memberAddress.zip_code ?? '',
  };
}

function mapMemberRelatedPerson(memberRelatedPerson: MemberRelatedPerson): PostMemberPerson {
  return {
    surname: memberRelatedPerson.surname ?? '',
    first_name: memberRelatedPerson.first_name ?? '',
    middle_name: memberRelatedPerson.middle_name ?? '',
    name_extension: memberRelatedPerson.name_extension ?? '',
    date_of_birth: moment(memberRelatedPerson.date_of_birth).format(DATE_FORMAT_DB),
    occupation: memberRelatedPerson.occupation ?? '',
    contact_number: memberRelatedPerson.contact_number ?? '',
    type: memberRelatedPerson.type ?? '',
  };
}
