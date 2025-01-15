﻿namespace CuahangtraicayAPI.Model.VnPay;

public class PaymentResponseModel
{
    public string OrderDescription { get; set; }
    public string TransactionId { get; set; }
    public string OrderId { get; set; }
    public string PaymentMethod { get; set; }
    public string PaymentId { get; set; }
    public bool Success { get; set; }
    public string Token { get; set; }
    public string VnPayResponseCode { get; set; }
    public decimal Amount { get; set; } // Thêm Amount
    public string AmountFormatted => Amount.ToString("#,##0");
    public string ResponseMessage { get; set; }
}