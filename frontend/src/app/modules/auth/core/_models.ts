export interface AuthModel {
  api_token: string
  refreshToken?: string
}
export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

// src/app/modules/auth/_models.ts
export interface UserModel {
  id: number
  role: string
  avatar: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  username?: string
  dob?: string
  address1?: string
  address2?: string
  city?: string
  country?: string
  timeZone?: string
  onSite?: boolean
  createdAt: string
  updatedAt: string
  position?: string
  positionId?: number
  departments: string[]
  departmentIds: number[]
  formClass?: string
  startYear?: number
  endYear?: number
  studentStatus?: string
}
