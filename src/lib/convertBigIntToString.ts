function convertBigIntToString<T>(obj: T): T {
    if (typeof obj === "bigint") {
        return obj.toString() as unknown as T
    }

    if (typeof obj === "object" && obj !== null) {
        const copiedObj = { ...obj } as Record<string, unknown>
        for (const key in copiedObj) {
            if (Object.prototype.hasOwnProperty.call(copiedObj, key)) {
                copiedObj[key] = convertBigIntToString(copiedObj[key])
            }
        }
        return copiedObj as T
    }

    return obj
}
