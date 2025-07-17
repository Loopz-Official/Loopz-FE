import * as z from 'zod/v4';

import { addressInfo } from './address';
import { objectInfo } from './object';

// Enum
export const paymentMethodEnum = z.enum(['BANK_TRANSFER', 'CREDIT_CARD']);
export type PaymentMethodEnum = z.infer<typeof paymentMethodEnum>;
export const paymentMethod = z.optional(paymentMethodEnum);
export type PaymentMethod = z.infer<typeof paymentMethod>;

export const orderStatusEnum = z.enum([
    'PENDING',
    'ORDERED',
    'SHIPPING',
    'DELIVERED',
    'CANCELED',
]);
export type OrderStatusEnum = z.infer<typeof orderStatusEnum>;
export const orderStatus = z.optional(orderStatusEnum);
export type OrderStatus = z.infer<typeof orderStatus>;

/**
 * Request Schema
 */
// 선택한 상품 정보 (POST 요청을 위한 key 값)
export const selectedProductInfo = z.strictObject({
    objectId: z.uuid(),
    quantity: z.int32().positive(),
});
export type SelectedProductInfo = z.infer<typeof selectedProductInfo>;

// 주문 요청 schema
export const orderRequest = z.strictObject({
    objects: z.array(selectedProductInfo),
    addressId: z.uuid(),
    paymentMethod,
    deliveryRequest: z.optional(z.string()),
    agreedToTerms: z.boolean(),
});
export type OrderRequest = z.infer<typeof orderRequest>;

export const baseOrderRequest = z.object({
    addressId: z.optional(z.uuid()),
    paymentMethod,
    deliveryRequest: z.string(),
    agreedToTerms: z.boolean(),
});
export type BaseOrderRequest = z.infer<typeof baseOrderRequest>;

// 상세보기에서 주문
export const detailOrderRequest = z.object({
    ...baseOrderRequest.shape,
    quantity: z.int32().nonnegative(),
});
export type DetailOrderRequest = z.infer<typeof detailOrderRequest>;

// 장바구니에서 주문
export const cartOrderRequest = z.object({
    ...baseOrderRequest.shape,
    objectIds: z.array(z.uuid()),
});
export type CartOrderRequest = z.infer<typeof cartOrderRequest>;

/**
 * Response Schema
 */

// 주문 관련 API Base Response
const orderBaseResponse = z.object({
    orderId: z.uuid(),
    paymentMethod: paymentMethodEnum,
    totalProductPrice: z.int32().nonnegative(), // 전체 상품 가격
    shippingFee: z.int32().nonnegative(), // 배송비
    totalPayment: z.int32().nonnegative(), // 총 결제 금액
});

/**
 * POST /order/v1
 */
// 주문 생성 API response의 Object schema
const placedOrderObjectInfo = z.object({
    ...objectInfo.omit({ objectPrice: true }).shape,
    purchasePrice: z.int32().nonnegative(),
});

// 주문 생성 API response schema
export const placedOrderResponse = z.object({
    ...orderBaseResponse.shape,
    objects: z.array(placedOrderObjectInfo),
});
export type PlacedOrderResponse = z.infer<typeof placedOrderResponse>;

/**
 * 주문 내역 (전체 및 상세) 조회 API Response Schema
 * (GET /order/v1)
 */

// 주문 전체 및 상세 내역 조회 시 Object schema
const orderedObjectDetailInfo = z.object({
    ...placedOrderObjectInfo.omit({ stock: true }).shape,
    intro: z.string(),
    status: orderStatusEnum,
    orderDate: z.iso.datetime(),
});
export type OrderedObjectDetailInfo = z.infer<typeof orderedObjectDetailInfo>;

// 전체 주문 내역 조회 (/order/v1)
export const orderHistoryUnit = z.object({
    orderId: z.uuid(),
    objects: z.array(orderedObjectDetailInfo),
});
export type OrderHistoryUnit = z.infer<typeof orderHistoryUnit>;

export const orderHistoryResponse = z.array(orderHistoryUnit);
export type OrderHistoryResponse = z.infer<typeof orderHistoryResponse>;

// 주문 상세 내역 조회 Schema
export const orderDetailResponse = z.object({
    ...orderBaseResponse.shape,
    orderNumber: z.string(), // 주문 번호 (주문 내역  조회 시 사용)
    objects: z.array(orderedObjectDetailInfo),
    address: addressInfo,
});
export type OrderDetailResponse = z.infer<typeof orderDetailResponse>;
