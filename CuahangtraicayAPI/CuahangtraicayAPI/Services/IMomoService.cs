using CuahangtraicayAPI.Model.Momo;
using CuahangtraicayAPI.Model.Order;

namespace CuahangtraicayAPI.Services;

public interface IMomoService
{
    Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(OrderInfoModel model);
    MomoExecuteResponseModel PaymentExecuteAsync(IQueryCollection collection);
}