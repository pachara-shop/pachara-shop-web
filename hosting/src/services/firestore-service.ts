import {
  Query,
  CollectionReference,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData,
} from 'firebase/firestore';

export interface PaginationParams {
  pageIndex: number;
  pageSize: number;
}

export async function paginateAndCount<T>(
  collectionRef: CollectionReference<DocumentData>,
  orderByField: string,
  params: PaginationParams,
  mapFn: (doc: DocumentData) => Promise<T>
): Promise<{ items: T[]; totalCount: number }> {
  const countSnapshot = await getDocs(
    query(collectionRef, orderBy(orderByField, 'asc'))
  );
  const totalCount = countSnapshot.size;
  let lastVisibleDoc = undefined;
  if (params.pageIndex > 0) {
    const cursorQuery = query(
      collectionRef,
      orderBy(orderByField, 'asc'),
      limit(params.pageIndex * params.pageSize)
    );
    const cursorSnap = await getDocs(cursorQuery);
    lastVisibleDoc = cursorSnap.docs[cursorSnap.docs.length - 1];
  }

  const paginatedQuery: Query<DocumentData> = query(
    collectionRef,
    orderBy(orderByField, 'asc'),
    ...(lastVisibleDoc ? [startAfter(lastVisibleDoc)] : []),
    limit(params.pageSize)
  );

  const snapshot = await getDocs(paginatedQuery);
  const items = await Promise.all(snapshot.docs.map(mapFn));

  return { items, totalCount };
}
