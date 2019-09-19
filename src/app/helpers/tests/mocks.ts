import { UserProfileUpdatedResponse } from 'src/app/models/Profile';
import {SocialUser} from 'angularx-social-login';

export const responseObject = {
  data: {
    property: {
      id: 5,
      price: 30000000.0,
      lot_size: 30.99,
      image_others: [
        'http://res.cloudinary.com/landville/image/upload/v1564747325/g8hioaz6f8bm3yi6qoxa.jpg',
        'http://res.cloudinary.com/landville/image/upload/v1564747325/ghxhns8lvdvm9e3nn6bj.jpg',
        'http://res.cloudinary.com/landville/image/upload/v1564747326/ozwzeofqpghbmo34klsh.jpg',
        'http://res.cloudinary.com/landville/image/upload/v1564747327/uzcult2245klz6o1dlim.jpg'
      ],
      address: {
        City: 'kampala',
        State: 'Kireka',
        Street: 'Profla'
      },
      coordinates: {
        lat: 2345345345.4535,
        lon: 98978.09
      },
      created_at: '2019-08-02T12:04:38.060244Z',
      updated_at: '2019-08-07T12:06:05.530189Z',
      title: '2 Bedroomed Flat',
      property_type: 'Empty Lot',
      description: 'Lorem ipsum dolor sit amet',
      list_date: null,
      is_published: true,
      is_sold: false,
      sold_at: null,
      bedrooms: 2,
      bathrooms: 1,
      garages: 1,
      image_main:
        'http://res.cloudinary.com/landville/image/upload/v1564747324/svqgwpof3icaik4l2s4l.jpg',
      video:
        'http://res.cloudinary.com/landville/video/upload/v1564747475/xj8tralyvqxjejat8qjf.mp4',
      view_count: 190,
      last_viewed: '2019-08-07T12:06:05.529965Z',
      purchase_plan: 'Installments',
      slug: 'profla-kireka-flats',
      client: {
        client_name: 'clients Company',
        phone: '+254 7002780187',
        email: 'clients.company@andela.com',
        address: {
          City: 'kampala',
          State: 'kamwokya',
          Street: 'mulago'
        }
      }
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
      image: '',
      card_info: {

      },
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
      bio: 'I am simply amazing',
      card_info: {
        card_info: {
          card_brand: 'MASTER CARD',
          embedtoken: 'flw-t1nf-4490d819ca68842ceb24ba4707ea8233-m03k',
          card_expiry: '10/22',
          card_number: '*********8381'
        }
      }
    },
    message: 'Profile retreived successfully'
  }
};

export const mockProfileResponse1 = {
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
      bio: 'I am simply amazing',
      card_info: {
        card_info: {
          card_brand: 'VISA',
          embedtoken: 'flw-t1nf-4490d819ca68842ceb24ba4707ea8233-m03k',
          card_expiry: '10/22',
          card_number: '*********8381'
        }
      }
    },
    message: 'Profile retreived successfully'
  }
};

export const mockProfileResponse2 = {
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
      bio: 'I am simply amazing',
      card_info: {
        card_info: {
          card_brand: 'AMERICAN EXPRESS',
          embedtoken: 'flw-t1nf-4490d819ca68842ceb24ba4707ea8233-m03k',
          card_expiry: '10/22',
          card_number: '*********8381'
        }
      }
    },
    message: 'Profile retreived successfully'
  }
};

export const mockProfileResponse3 = {
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
      bio: 'I am simply amazing',
      card_info: {
        card_info: {}
      }
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
      bio: 'I am simply amazing',
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

// mock the return object of deposits data
export const mockDepositsResponse = {
  data: {
    transactions: [
      {
        title: 'people prop',
        buyer: 'buyer@vmailcloud.com',
        price: 2000.0,
        total_amount_paid: 300.0,
        balance: 1700.0,
        deposits: [
          {
            date: '2019-08-15T08:11:46.716743Z',
            amount: 300.0
          }
        ],
        percentage_completion: '15.00'
      }
    ]
  },
  message: 'Transaction(s) retrieved successfully'
};

export const passwordResetMock = {
  errors: {
    email: [
      'Enter a valid email address.'
    ]
  }
};

export const passwordResetResponse = {
  data: {
    message: 'If you have an account with us we have sent an email to reset your password'
  }
};

export const userData: SocialUser = {
  id: '123',
  name: 'Kelvin Onkundi',
  email: 'kelvin.onkundi@andela.com',
  photoUrl: 'www.photo.com',
  firstName: 'Kelvin',
  authToken: 'a29',
  idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0ZjI5NGM0NTE2MDA4OGQwNzlmZWU2ODEzOGY1MjEzM2QzZTIyOGMiLCJ0eXAiOiJKV1QifQ.',
  lastName: 'Onkundi',
  provider: 'GOOGLE',
  authorizationCode: 'sjsksj'
};

export const clientsMockresponse = {
  data: {
    client_companies: [
      {
        address: { City: 'TestCity', State: 'Nigeria', Street: 'TestStreet' },
        client_name: 'company',
        email: 'landproperty@mail.net',
        phone: '+256 123 3232234'
      }
    ],
    message: 'You have retrieved all clients'
  }
};
export const mockReviewsResponse = {
  count: 11,
  next: 'http://127.0.0.1:8000/api/v1/auth/1/reviews/?limit=10&offset=10',
  previous: null,
  results: [
    {
      id: 11,
      created_at: '2019-08-29T07:10:20.158541Z',
      updated_at: '2019-08-29T07:10:20.158570Z',
      review: 'Malesuada bibendum arcu vitae elementum curabitur vitae nunc',
      reviewer: {
        email: 'buyer@testing.com',
        first_name: 'buyer',
        last_name: 'dorothy',
        role: 'BY',
        image: 'http://res.cloudinary.com/landville/image/upload/v1567094295/yhhaucrvkdgjqiizef6n.png'
      },
      client: 1,
      replies: []
    },
    {
      id: 10,
      created_at: '2019-08-29T07:10:18.558848Z',
      updated_at: '2019-08-29T07:10:18.558884Z',
      review: 'Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed.',
      reviewer: {
        email: 'buyer@testing.com',
        first_name: 'buyer',
        last_name: 'dorothy',
        role: 'BY',
        image: 'http://res.cloudinary.com/landville/image/upload/v1567094295/yhhaucrvkdgjqiizef6n.png'
      },
      client: 1,
      replies: []
    }
  ]
};
export const reviewResponse = {
  count: 0,
  next: 'http://127.0.0.1:8000/api/v1/auth/1/reviews/?limit=10&offset=10',
  previous: 'http://127.0.0.1:8000/api/v1/auth/1/reviews/?limit=10&offset=10',
  results: []
};
