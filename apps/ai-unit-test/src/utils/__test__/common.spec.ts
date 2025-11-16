import { pick, debounce } from "@/utils/common";

describe("pick util 단위테스트", () => {
  it("단일 인자로 전달된 키의 값을 객체에 담아 반환한다", () => {
    const obj = {
      a: "A",
      b: { c: "C" },
      d: null,
    };

    expect(pick(obj, "a")).toEqual({ a: "A" });
  });

  it("2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다", () => {
    const obj = {
      a: "A",
      b: { c: "C" },
      d: null,
    };

    expect(pick(obj, "a", "b")).toEqual({ a: "A", b: { c: "C" } });
  });

  it("대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다", () => {
    // @ts-expect-error intentionally testing undefined source
    expect(pick()).toEqual({});
  });

  it("propNames를 지정하지 않을 경우 빈 객체가 반환된다", () => {
    const obj = {
      a: "A",
      b: { c: "C" },
      d: null,
    };

    expect(pick(obj)).toEqual({});
  });
});

// 테스트 코드는 비동기 타이머와 무관하게 동기적으로 실행
// -> 비동기 함수가 실행되기 전에 단언이 실행됨
// 타이머 모킹!
describe("debounce util 단위테스트", () => {
  // 타이머 모킹 -> 0.3초 흐른 것으로 타이머 조작 -> spy 함수 호출 확인
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("함수를 호출하면 일정 시간 후에 함수가 실행된다", () => {
    const fn = vi.fn();
    const debounceFn = debounce(fn, 300);
    debounceFn();
    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalled();
  });

  it("연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 실행된다", () => {
    const fn = vi.fn();
    const debounceFn = debounce(fn, 300);
    debounceFn();
    vi.advanceTimersByTime(100);
    debounceFn();
    vi.advanceTimersByTime(200);
    debounceFn();
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
