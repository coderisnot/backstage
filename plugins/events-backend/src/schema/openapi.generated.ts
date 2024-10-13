/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ******************************************************************
// * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. *
// ******************************************************************
import { createValidatedOpenApiRouter } from '@backstage/backend-openapi-utils';

export const spec = {
  openapi: '3.0.3',
  info: {
    title: 'events',
    version: '1',
    description: 'The Backstage backend plugin that powers the events system.',
    license: {
      name: 'Apache-2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    contact: {},
  },
  servers: [
    {
      url: '/',
    },
  ],
  components: {
    examples: {},
    headers: {},
    parameters: {
      subscriptionId: {
        name: 'subscriptionId',
        in: 'path',
        required: true,
        allowReserved: true,
        schema: {
          type: 'string',
        },
      },
    },
    requestBodies: {},
    responses: {
      ErrorResponse: {
        description: 'An error response from the backend.',
        content: {
          'application/json; charset=utf-8': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
    schemas: {
      Event: {
        type: 'object',
        required: ['topic', 'payload'],
        properties: {
          topic: {
            type: 'string',
            description: 'The topic that the event is published on',
          },
          payload: {
            description: 'The event payload',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
            required: ['name', 'message'],
          },
          request: {
            type: 'object',
            properties: {
              method: {
                type: 'string',
              },
              url: {
                type: 'string',
              },
            },
            required: ['method', 'url'],
          },
          response: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
              },
            },
            required: ['statusCode'],
          },
        },
        required: ['error', 'request', 'response'],
      },
    },
    securitySchemes: {
      JWT: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/bus/v1/events': {
      post: {
        operationId: 'PostEvent',
        description: 'Publish a new event',
        responses: {
          '201': {
            description: 'The event was published successfully',
          },
          '204': {
            description:
              'The event did not need to be published as all subscribers have already been notified',
          },
          default: {
            $ref: '#/components/responses/ErrorResponse',
          },
        },
        security: [
          {},
          {
            JWT: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['event'],
                properties: {
                  event: {
                    $ref: '#/components/schemas/Event',
                  },
                  notifiedSubscribers: {
                    type: 'array',
                    description:
                      'The IDs of subscriptions that have already received this event',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
              examples: {
                'Publishing a simple Event': {
                  value: {
                    event: {
                      topic: 'test-topic',
                      payload: {
                        myData: 'foo',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/bus/v1/subscriptions/{subscriptionId}': {
      put: {
        operationId: 'PutSubscription',
        description:
          'Ensures that the subscription exists with the provided configuration',
        responses: {
          '201': {
            description: 'The subscription exists or was created successfully',
          },
          default: {
            $ref: '#/components/responses/ErrorResponse',
          },
        },
        security: [
          {},
          {
            JWT: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/subscriptionId',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['topics'],
                properties: {
                  topics: {
                    type: 'array',
                    description: 'The topics to subscribe to',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
              examples: {
                'Subscribing to a single topic': {
                  value: {
                    topics: ['test-topic'],
                  },
                },
              },
            },
          },
        },
      },
    },
    '/bus/v1/subscriptions/{subscriptionId}/events': {
      get: {
        operationId: 'GetSubscriptionEvents',
        description: 'Get new events for the provided subscription',
        responses: {
          '200': {
            description: 'New events',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['events'],
                  properties: {
                    events: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Event',
                      },
                    },
                  },
                },
              },
            },
          },
          '202': {
            description:
              'No new events are available. Response will block until the client should try again.',
          },
          default: {
            $ref: '#/components/responses/ErrorResponse',
          },
        },
        security: [
          {},
          {
            JWT: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/subscriptionId',
          },
        ],
      },
    },
  },
} as const;
export const createOpenApiRouter = async (
  options?: Parameters<typeof createValidatedOpenApiRouter>['1'],
) => createValidatedOpenApiRouter<typeof spec>(spec, options);
