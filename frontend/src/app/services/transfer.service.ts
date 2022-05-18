import { Injectable, OnInit } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { BehaviorSubject, map, Observable } from 'rxjs';

import { TRANSFER_CONTRACT_ADDRESS, TRANSFER_TOKEN_ABI } from "../../abis";
import { Donation } from '../models/donation';
import { WEB3_MODAL_OPTIONS } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransferService implements OnInit {

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any
  contract: any

  donationsSource$ = new BehaviorSubject<Donation[]>([]);
  balanceSource$ = new BehaviorSubject<number>(0);
  
  constructor() {
    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
    this.setLiveDonations();
    this.setBalance();
  }

  ngOnInit(): void {
    this.setLiveDonations();
    this.setBalance();
  }

  async tranferEthereum(transferAddress: string, amount: number, postId: number, message: string): Promise<void> {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);
    await this.contract.methods.pay(transferAddress, message, postId).send({
       from: this.accounts[0], value: Web3.utils.toWei(amount.toString(), 'ether') }
    )

    this.setLiveDonations();
    this.setBalance();
  }

  async getDonations() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);
    return await this.contract.methods.getDonations().call({
      from: this.accounts[0]
    });
  }

  private async getBalance(): Promise<number> {  
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    return this.web3js.eth.getBalance(this.accounts[0]).then((balance: string) => {
      return parseFloat(Web3.utils.fromWei(balance, 'ether')).toFixed(5);
    })
  }

  private setLiveDonations(): void {
    let donationObjects: Donation[] = [];
    this.getDonations().then((donations) => {
      donations.forEach((donation: any[]) => {
        const donationObject: Donation = <Donation> {
          accountSender: donation[0],
          accountReceiver: donation[1],
          amount: parseFloat(Web3.utils.fromWei(donation[2], 'ether')),  //TODO
          postId: donation[3],
          message: donation[4]
        }
        donationObjects.push(donationObject);
      })
      this.donationsSource$.next(donationObjects);
    })
  }

  private setBalance(): void {
    this.getBalance().then((balance) => {
      this.balanceSource$.next(balance);
    })
  }

  getLiveDonations(): Observable<Donation[]> {
    return this.donationsSource$.asObservable();
  }

  getCurrentBalance(): Observable<number> {
    return this.balanceSource$.asObservable();
  }

  getMoneyShared(address: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donations => donations.accountSender === address)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return sum.toString();
    })))
  }

  getMoneyReceived(address: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donations => donations.accountReceiver === address)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return sum.toString();
    })))
  }

  // getNumberOfPosts(address: string): Observable<number> {
  //   return this.getLiveDonations()
  // }

  getMoneyRaisedForPost(postId: number): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {      
      const sum = donations.filter(donations => donations.postId == postId)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return sum.toString();
    })))
  }
}