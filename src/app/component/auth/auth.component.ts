import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneIdentity } from '../../../swagger-codegen/models/phone-identity';
import { VerifyIdentityRequest } from '../../../swagger-codegen/models/verify-identity-request';
import { AuthService } from '../../service/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SendTokenResponse } from '../../../swagger-codegen/models/send-token-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule,CommonModule],  
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  phoneIdentity: PhoneIdentity = { countryCode: '', phoneNumber: '' };
  verifyIdentityRequest: VerifyIdentityRequest = { phoneNumber: '', otp: '', sessionToken: '' };
  errorMessage: string = '';
  otpSent: boolean = false;

  sendOTPResponse!: SendTokenResponse; 
  isAuthenticated: boolean = false;

  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

 
  sendOTP() {
    this.authService.sendOTP(this.phoneIdentity).subscribe(
      (response) => {
        console.log('Response from sendOTP:', response); 
        this.sendOTPResponse = response; 
        this.otpSent = true;
      },
      (error) => {
        console.error('Failed to send OTP:', error); 
        this.errorMessage = 'Failed to send OTP. Please try again.';
      }
    );
  }


 verifyOTP() {
    if (!this.sendOTPResponse) {
      this.errorMessage = 'Please send OTP first.';
      return;
    }

    this.verifyIdentityRequest.phoneNumber = this.phoneIdentity.phoneNumber;
    this.verifyIdentityRequest.sessionToken = this.sendOTPResponse.token; // Use stored response token

    this.authService.verifyOTP(this.verifyIdentityRequest).subscribe(
      verifyResponse => {
        console.log('Response from verifyOTP:', verifyResponse); 
        if (verifyResponse.jwtToken) {
          this.isAuthenticated = true;
          this.authService.setAuthToken(verifyResponse.jwtToken);
          console.log('authenticated',this.isAuthenticated);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        } else {
          this.errorMessage = 'Invalid OTP. Please try again.';
        }
      },
      () => {
        this.errorMessage = 'Failed to verify OTP. Please try again.';
      }
    );
  }

  logout(){
    this.authService.clearAuthToken();
    this.router.navigate(['/home']);
  }
}