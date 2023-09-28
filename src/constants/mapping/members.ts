import type { PostMemberPayload, PostMemberPerson } from '@/types/api/member';
import type { Member, MemberAddress, MemberForm, MemberRelatedPerson } from '@/types/ui/members';
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
    member_at: moment(memberForm.member_at).format(DATE_FORMAT_DB),
    mobile_number: memberForm.mobile_number ?? '',
    telephone_number: memberForm.telephone_number ?? '',
    oriented: memberForm.oriented ?? false,
    profile_picture_url: memberForm.profile_picture_url,
    permanent_address: mapMemberAddressPermanent(memberForm.permanent_address),
    present_address: mapMemberAddressPresent(memberForm.present_address),
    father: mapMemberRelatedPerson(memberForm.father),
    mother: mapMemberRelatedPerson(memberForm.mother),
    spouse: mapMemberRelatedPerson(memberForm.spouse),
    beneficiaries:
      memberForm.beneficiaries?.map((r) => ({
        ...r,
        birthdate: r.birthdate ? moment(r.birthdate).format(DATE_FORMAT_DB) : null,
      })) ?? [],
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
    zip_code: memberAddress.zip_code ?? undefined,
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
    zip_code: memberAddress.zip_code ?? undefined,
  };
}

function mapMemberRelatedPerson(memberRelatedPerson: MemberRelatedPerson): PostMemberPerson {
  return {
    surname: memberRelatedPerson.surname ?? '',
    first_name: memberRelatedPerson.first_name ?? '',
    middle_name: memberRelatedPerson.middle_name ?? '',
    name_extension: memberRelatedPerson.name_extension ?? '',
    date_of_birth: memberRelatedPerson.date_of_birth
      ? moment(memberRelatedPerson.date_of_birth).format(DATE_FORMAT_DB)
      : null,
    occupation: memberRelatedPerson.occupation ?? '',
    contact_number: memberRelatedPerson.contact_number ?? '',
    type: memberRelatedPerson.type ?? '',
  };
}

export function mapMemberToMemberForm(member: Member): MemberForm {
  // Copy the common properties
  const memberForm: MemberForm = {
    surname: member.surname,
    first_name: member.first_name,
    middle_name: member.middle_name,
    name_extension: member.name_extension,
    date_of_birth: member.date_of_birth ? moment(member.date_of_birth).toDate() : undefined, // Cast date using Moment.js
    place_of_birth: member.place_of_birth,
    date_hired: member.date_hired ? moment(member.date_hired).toDate() : undefined, // Cast date using Moment.js
    department: member.department,
    position: member.position,
    employee_no: member.employee_no,
    tin_no: member.tin_no,
    email_address: member.email_address,
    member_at: member.member_at,
    oriented: member.oriented,
    gender: member.gender,
    telephone_number: member.telephone_number,
    mobile_number: member.mobile_number,
    beneficiaries: member.beneficiaries,
    present_address: member.present_address,
    permanent_address: member.permanent_address,
    father: {
      ...member.father,
      date_of_birth: member.father.date_of_birth ? moment(member.father.date_of_birth).toDate() : undefined,
    },
    mother: {
      ...member.mother,
      date_of_birth: member.mother.date_of_birth ? moment(member.mother.date_of_birth).toDate() : undefined,
    },
    spouse: {
      ...member.spouse,
      date_of_birth: member.spouse.date_of_birth ? moment(member.spouse.date_of_birth).toDate() : undefined,
    },
    profile_picture_url: member.profile_picture_url,
  };

  return memberForm;
}
