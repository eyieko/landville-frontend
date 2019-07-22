import {
  UserProfileResponse,
  UserProfileUpdatedResponse,
  UserProfileForm
} from 'src/app/models/Profile';

export const mockProfileResponse: UserProfileResponse = {
  data: {
    profile: {
      user: {
        first_name: 'Mock',
        last_name: 'User',
        email: 'mock@user.com',
        id: 3,
        role: 'Buyer'
      },
      address: {
        City: 'Nairobi',
        Street: 'Wall St',
        State: 'Nairobi'
      },
      phone: '34555435354345',
      employer: 'LandVille',
      designation: 'Boss',
      next_of_kin: 'Kin',
      next_of_kin_contact: '32425435345',
      bio: 'I make it rain!',
      level: 'Level?',
      image: 'http://www.image.com/'
    }
  }
};

export const mockUpdatedProfileResponse: UserProfileUpdatedResponse = {
  data: {
    profile: {
      user: {
        first_name: 'Updated',
        last_name: 'User',
        email: 'mock@user.com',
        id: 3,
        role: 'Buyer'
      },
      address: {
        City: 'Nairobi',
        Street: 'Wall St',
        State: 'Nairobi'
      },
      phone: '34555435354345',
      employer: 'LandVille',
      designation: 'Boss',
      next_of_kin: 'Kin',
      next_of_kin_contact: '32425435345',
      bio: 'I make it rain!',
      level: 'Level?',
      image: 'http://www.image.com/'
    },
    message: 'Successfully updated your profile'
  }
};

export const mockProfileForm: UserProfileForm = {
  firstName: 'Mock',
  lastName: 'Again',
  email: 'another@mock.user',
  City: 'Lagos',
  State: 'Obo',
  Street: 'Lagobo',
  image: 'http://www.lagos.com/flats',
  phone: '2435235345234532',
  employer: 'Lander',
  designation: 'Pointman',
  nextOfKin: 'Sibling',
  nextOfKinContact: '243525345234523',
  bio: 'Exceptionally bad'
};
