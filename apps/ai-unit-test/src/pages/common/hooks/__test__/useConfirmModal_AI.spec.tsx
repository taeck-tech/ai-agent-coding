import { act, renderHook } from '@testing-library/react';

import useConfirmModal from '../useConfirmModal';

describe('useConfirmModal', () => {
  it('initializes isModalOpened to false when no initialValue is provided', () => {
    const { result } = renderHook(() => useConfirmModal());

    expect(result.current.isModalOpened).toBe(false);
  });

  it('initializes isModalOpened with the provided initialValue', () => {
    const { result: trueInitialValueResult } = renderHook(() =>
      useConfirmModal(true),
    );
    const { result: falseInitialValueResult } = renderHook(() =>
      useConfirmModal(false),
    );

    expect(trueInitialValueResult.current.isModalOpened).toBe(true);
    expect(falseInitialValueResult.current.isModalOpened).toBe(false);
  });

  it('toggles isModalOpened when toggleIsModalOpened is called', () => {
    const { result } = renderHook(() => useConfirmModal());

    act(() => {
      result.current.toggleIsModalOpened();
    });

    expect(result.current.isModalOpened).toBe(true);

    act(() => {
      result.current.toggleIsModalOpened();
    });

    expect(result.current.isModalOpened).toBe(false);
  });
});
