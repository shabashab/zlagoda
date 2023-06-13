type EventEmitCallback = () => unknown

export const createEventEmitter = () => {
  const subscribers = new Map<number, EventEmitCallback>()
  let lastSubscriberId = 0

  const emit = () => {
    for (const subscriber of subscribers.values()) {
      subscriber()
    }
  }

  const subscribe = (onEmit: EventEmitCallback) => {
    const subscriberId = lastSubscriberId++
    subscribers.set(subscriberId, onEmit)

    return () => {
      subscribers.delete(subscriberId)
    }
  }

  return {
    emit,
    subscribe,
  }
}
