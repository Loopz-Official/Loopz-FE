// import { GetObjectListDto } from '@/services/apis/object/type';
// import { getObjectList } from '@/services/apis/object';

// import ProductList from './ProductList';
// import ProductListToolbar from './ProductListToolbar';

// export default async function ObjectBoard() {
//     let productData: GetObjectListDto | null = null;

//     try {
//         const response = await getObjectList();
//         productData = response.data;
//     } catch (error) {
//         if (typeof window !== 'undefined') {
//             alert('상품 리스트를 받아오는 중 문제가 발생했습니다.');
//         } else {
//             console.error('getObjectList 실패: ', error);
//         }
//     }

//     return (
//         <div>
//             <div className="px-5">
//                 <h2 className="text-headline-03">Object Board</h2>
//                 <ProductListToolbar
//                     productCount={productData?.objectCount ?? 0}
//                 />
//             </div>
//             <ProductList products={productData?.objects ?? []} />
//         </div>
//     );
// }
