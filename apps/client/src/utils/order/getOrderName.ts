import { ObjectInfo } from '@/schemas/object';

/**
 * 상품 배열을 받아 주문 이름
 * - 1개: 상품명 그대로
 * - 2개 이상: 첫 상품명 + ' 외 (n-1)건'
 * - 0번 objectName이 없으면 에러 throw
 */
export function getOrderName(items: ObjectInfo[]): string {
    if (!items || items.length === 0) return '';

    const firstName = items[0]?.objectName;
    if (!firstName) {
        throw new Error('주문 이름 생성에 필요한 objectName이 없습니다.');
    }
    if (items.length === 1) return firstName;
    return `${firstName} 외 ${items.length - 1}건`;
}
