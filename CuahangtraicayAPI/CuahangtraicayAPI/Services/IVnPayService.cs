﻿using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Services;
public interface IVnPayService
{
    string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
    PaymentResponseModel PaymentExecute(IQueryCollection collections);

}