import { UserProfileUpdatedResponse } from 'src/app/models/Profile';

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
      image: ''
    },
    message: 'Successfully updated your profile'
  }
};

export const mockProfileForm = {
  value: {
    firstName: 'Mock',
    lastName: 'Again',
    email: 'another@mock.user',
    City: 'Lagos',
    State: 'Obo',
    Street: 'Lagobo',
    image: '',
    phone: '2435235345234532',
    employer: 'Lander',
    designation: 'Pointman',
    nextOfKin: 'Sibling',
    nextOfKinContact: '243525345234523',
    bio: 'Exceptionally bad'
  }
};

export const mockProfileResponse = {
  data: {
    profile: {
      user: {
        id: 13,
        first_name: 'Client',
        last_name: 'Forever',
        email: 'forever@young.forever',
        role: 'CA'
      },
      phone: '+234 123 4435500',
      address: {
        City: 'Kigali',
        State: 'Rwanda',
        Street: 'Burn'
      },
      level: 'STARTER',
      image: 'https://dummyimage.com/300',
      employer: 'Fast Foods',
      designation: 'Waiter',
      next_of_kin: 'Masha',
      next_of_kin_contact: '235235423523452',
      bio: 'I am simply amazing'
    },
    message: 'Profile retreived successfully'
  }
};

export const mockProfileResponseNoAddress = {
  data: {
    profile: {
      user: {
        id: 13,
        first_name: 'Client',
        last_name: 'Forever',
        email: 'forever@young.forever',
        role: 'CA'
      },
      phone: '+234 123 4435500',
      address: {},
      level: 'STARTER',
      image: null,
      employer: 'Fast Foods',
      designation: 'Waiter',
      next_of_kin: 'Masha',
      next_of_kin_contact: '235235423523452',
      bio: 'I am simply amazing'
    },
    message: 'Profile retreived successfully'
  }
};

export const mockProfileFormErrorResponse = {
  error: {
    errors: {
      phone: ['Phone number must be of the format +234 123 4567890']
    }
  }
};
