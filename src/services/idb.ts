interface ObjectStoreConfig {
  name: string
  keyPath: string
  indexes?: { name: string; keyPath: string; options?: IDBIndexParameters }[]
}

export function openDatabase(objectStores: ObjectStoreConfig[] = []): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const databaseName = 'toDoApp'
    const databaseVersion = 1
    const DBOpenRequest = window.indexedDB.open(databaseName, databaseVersion)

    DBOpenRequest.onerror = () => {
      console.error(DBOpenRequest.error)
      reject(DBOpenRequest.error)
    }

    DBOpenRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      for (const config of objectStores) {
        if (!db.objectStoreNames.contains(config.name)) {
          const objectStore = db.createObjectStore(config.name, { keyPath: config.keyPath })

          if (config.indexes) {
            for (const indexConfig of config.indexes) {
              objectStore.createIndex(indexConfig.name, indexConfig.keyPath, indexConfig.options)
            }
          }
        }
      }
    }

    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result
      resolve(db)
    }
  })
}

export async function displayData<T>(db: IDBDatabase, objectStoreName: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, 'readonly')
    const objectStore = transaction.objectStore(objectStoreName)
    const items: T[] = []

    transaction.onerror = (event) => {
      reject((event.target as IDBTransaction).error)
    }

    const cursorRequest = objectStore.openCursor()

    cursorRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result

      if (cursor) {
        const item = cursor.value as T
        items.push(item)
        cursor.continue()
      } else {
        resolve(items)
      }
    }

    cursorRequest.onerror = (event) => {
      reject((event.target as IDBRequest<IDBCursorWithValue>).error)
    }
  })
}

export async function addData<T>(db: IDBDatabase, objectStoreName: string, item: T): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, 'readwrite')
    const objectStore = transaction.objectStore(objectStoreName)
    const request = objectStore.add(item)

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = (event) => {
      reject((event.target as IDBTransaction).error)
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

export async function getItem<T>(db: IDBDatabase, objectStoreName: string, id: number): Promise<T | null> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, 'readonly')
    const objectStore = transaction.objectStore(objectStoreName)
    const request = objectStore.get(id)

    transaction.onerror = (event) => {
      reject((event.target as IDBTransaction).error)
    }

    request.onsuccess = (event) => {
      const item = (event.target as IDBRequest<IDBCursorWithValue>).result
      resolve(item ? (item.value as T) : null)
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest<IDBCursorWithValue>).error)
    }
  })
}

export async function updateItem<T>(db: IDBDatabase, objectStoreName: string, id: number, updatedItem: T): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, 'readwrite')
    const objectStore = transaction.objectStore(objectStoreName)
    const getRequest = objectStore.get(id)

    getRequest.onsuccess = (event) => {
      const existingItem = (event.target as IDBRequest<IDBCursorWithValue>).result

      if (existingItem) {
        const updateRequest = objectStore.put(updatedItem)

        updateRequest.onsuccess = () => {
          resolve()
        }

        updateRequest.onerror = (event) => {
          reject((event.target as IDBRequest).error)
        }
      } else {
        reject(new Error(`Item with ID ${id} not found in object store ${objectStoreName}.`))
      }
    }

    getRequest.onerror = (event) => {
      reject((event.target as IDBRequest<IDBCursorWithValue>).error)
    }

    transaction.onerror = (event) => {
      reject((event.target as IDBTransaction).error)
    }
  })
}

export async function deleteItem(db: IDBDatabase, objectStoreName: string, id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, 'readwrite')
    const objectStore = transaction.objectStore(objectStoreName)
    const request = objectStore.delete(id)

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = (event) => {
      reject((event.target as IDBTransaction).error)
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}
