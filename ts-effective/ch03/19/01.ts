interface Product {
  id: string
  name: string
  price: number
}

function logProduct(product: Product) {
  const id: number = product.id;
  //    ~~ Type 'string' is not assignable to type 'number'.
  console.log(id);
}

// furby의 타입 구문을 Product로 제대로 명시한다면, 실제로 실수가 발생한 부분에 오류를 표시해준다.
// 만약 지운다면 호출했을 때 furby에 오류가 잡힌다.
const furby: Product = {
  name: "Furby",
  id: 128712387123,
  price: 35,
};

logProduct(furby);

export default {}