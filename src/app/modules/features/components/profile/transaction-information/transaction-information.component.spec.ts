import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { resetSpies, transactionServiceSpy } from 'src/app/helpers/tests/spies';
import { TransactionInformationComponent } from 'src/app/modules/features/components/profile/transaction-information/transaction-information.component';
import { TransactionInformationService } from 'src/app/services/profile/transaction-information/transaction-information.service';
import { EmptyTransactionComponent } from 'src/app/modules/features/components/profile/transaction-information/empty-transaction/empty-transaction.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('TransactionInformationComponent', () => {
  let component: TransactionInformationComponent;
  let fixture: ComponentFixture<TransactionInformationComponent>;
  const url = 'http://api/v1/transactions';

  const Mockresponse = {
    data: {
      transactions: [
        {
          title: 'Plazza de ciel',
          buyer: 'jeandedieuam@gmail.com',
          price: 500.0,
          total_amount_paid: 500.0,
          balance: 0.0,
          deposits: [
            {
              date: '2019-08-20T16:47:02.723002Z',
              amount: 500.0
            }
          ],
          percentage_completion: '100.00',
          image_main:
            'http://res.cloudinary.com/landville/image/upload/v1566319487/gxeuj5s7nxi3ulxoff7g.jpg',
          address: {
            City: 'Bukavu',
            State: 'Congo',
            Street: 'Nyawera'
          }
        }
      ]
    }
  };
  beforeAll(() => resetSpies([transactionServiceSpy]));
  afterEach(() => resetSpies([transactionServiceSpy]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionInformationComponent,
        EmptyTransactionComponent
      ],
      imports: [SharedModule, HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: TransactionInformationService,
          useValue: transactionServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInformationComponent);
    component = fixture.componentInstance;
    transactionServiceSpy.getTransactions.and.returnValue(of(Mockresponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTransactions method', () => {
    transactionServiceSpy.getTransactions.and.returnValue(of(Mockresponse));
    component.setTransacation();
    expect(component.results).toEqual(Mockresponse.data.transactions);
  });
  it('should set all transactions to an empty array if there is no avalaible transaction', () => {
    const response = {
      data: {
        transactions: []
      }
    };

    transactionServiceSpy.getTransactions.and.returnValue(of(response));
    component.setTransacation();
    expect(component.inProgressTransactions.length).toBe(0);
  });
  it('should push data in the inProgressTransactions array', () => {
    const response = {
      data: {
        transactions: [
          {
            title: 'Plazza de ciel',
            buyer: 'jeandedieuam@gmail.com',
            price: 500.0,
            total_amount_paid: 400.0,
            balance: 0.0,
            deposits: [
              {
                date: '2019-08-20T16:47:02.723002Z',
                amount: 500.0
              }
            ],
            percentage_completion: '100.00',
            image_main:
              'http://res.cloudinary.com/landville/image/upload/v1566319487/gxeuj5s7nxi3ulxoff7g.jpg',
            address: {
              City: 'Bukavu',
              State: 'Congo',
              Street: 'Nyawera'
            }
          }
        ]
      }
    };

    transactionServiceSpy.getTransactions.and.returnValue(of(response));
    component.setTransacation();
    expect(component.inProgressTransactions).toEqual(
      response.data.transactions
    );
  });
});
