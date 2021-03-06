import { ThreadID } from '@textile/hub';

export function createDbMutation({ client, name }) {
  return client.newDB(undefined, name);
}

export function deleteDbMutation({ client, threadId }) {
  return client.deleteDB(ThreadID.fromString(threadId));
}

export function createCollectionMutation({ client, threadId, name }) {
  return client.newCollection(ThreadID.fromString(threadId), { name });
}

export function createCollectionFromObjectMutation({
  client,
  threadId,
  name,
  schema,
}) {
  const config = { name };
  return client.newCollectionFromObject(
    ThreadID.fromString(threadId),
    schema,
    config
  );
}

export function deleteCollectionMutation({ client, threadId, name }) {
  return client.deleteCollection(ThreadID.fromString(threadId), name);
}
