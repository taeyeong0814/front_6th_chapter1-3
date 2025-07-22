import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 1. 이전 props를 저장할 ref 생성
  const prevPropsRef = { current: null as P | null };

  // 2. 메모이제이션된 컴포넌트 생성
  const MemoizedComponent: FunctionComponent<P> = (props) => {
    // 3. 이전 props와 현재 props 비교
    if (prevPropsRef.current && equals(prevPropsRef.current, props)) {
      // 4. props가 같으면 이전 컴포넌트 반환
      return null as any; // React는 null을 반환하면 이전 렌더링을 재사용합니다.
    }

    // 5. props가 다르면 현재 props를 저장하고 컴포넌트 렌더링
    prevPropsRef.current = props;
    return <Component {...props} />;
  };

  // 3. equals 함수를 사용하여 props 비교

  // 4. props가 변경된 경우에만 새로운 렌더링 수행

  return Component;
}
