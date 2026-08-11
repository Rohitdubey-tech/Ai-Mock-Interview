// In-Memory store fallback when MongoDB is unavailable

const questions = [
  // System Design
  {
    _id: 'q1',
    text: 'Design a scalable URL shortening service like Bitly. Explain the database choice, hashing algorithm, key generation strategy, and caching mechanism.',
    type: 'System Design',
    difficulty: 'Hard',
    tags: ['system design', 'scalability', 'hashing', 'databases']
  },
  {
    _id: 'q2',
    text: 'How would you architect a real-time chat application handling millions of concurrent WebSocket connections?',
    type: 'System Design',
    difficulty: 'Hard',
    tags: ['system design', 'websockets', 'scalability', 'redis']
  },
  {
    _id: 'q3',
    text: 'Design a distributed rate limiter for API endpoints. Discuss token bucket vs sliding window log algorithms.',
    type: 'System Design',
    difficulty: 'Medium',
    tags: ['system design', 'rate limiting', 'api', 'distributed']
  },

  // Frontend
  {
    _id: 'q4',
    text: 'Explain how React Virtual DOM works. How does reconciliation diffing work, and how do keys optimize rendering?',
    type: 'Frontend',
    difficulty: 'Medium',
    tags: ['react', 'virtual dom', 'frontend', 'javascript']
  },
  {
    _id: 'q5',
    text: 'Describe Event Delegation in JavaScript. How does event bubbling and capturing work under the hood?',
    type: 'Frontend',
    difficulty: 'Easy',
    tags: ['javascript', 'dom', 'events', 'frontend']
  },
  {
    _id: 'q6',
    text: 'How would you optimize the Core Web Vitals (LCP, FID, CLS) of a large single page application?',
    type: 'Frontend',
    difficulty: 'Hard',
    tags: ['performance', 'frontend', 'web-vitals', 'optimization']
  },

  // Backend
  {
    _id: 'q7',
    text: 'Explain the Node.js Event Loop. What are microtasks, macrotasks, process.nextTick, and how does asynchronous I/O operate?',
    type: 'Backend',
    difficulty: 'Medium',
    tags: ['nodejs', 'event-loop', 'backend', 'async']
  },
  {
    _id: 'q8',
    text: 'Compare SQL (Relational) vs NoSQL (Document/KeyValue) databases. How do you choose between ACID compliance vs horizontal scalability?',
    type: 'Backend',
    difficulty: 'Medium',
    tags: ['database', 'sql', 'nosql', 'architecture']
  },
  {
    _id: 'q9',
    text: 'How do JWT authentication tokens work? What are the security trade-offs of storing tokens in HTTP-only cookies vs LocalStorage?',
    type: 'Backend',
    difficulty: 'Easy',
    tags: ['auth', 'jwt', 'security', 'backend']
  },

  // DSA
  {
    _id: 'q10',
    text: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target. Optimize for O(N) time complexity.',
    type: 'DSA',
    difficulty: 'Easy',
    tags: ['dsa', 'arrays', 'hash table']
  },
  {
    _id: 'q11',
    text: 'Given the root of a binary tree, invert the tree and return its root. Explain both recursive and iterative approaches.',
    type: 'DSA',
    difficulty: 'Easy',
    tags: ['dsa', 'trees', 'recursion']
  },
  {
    _id: 'q12',
    text: 'Implement a LRU (Least Recently Used) Cache with O(1) time complexity for get and put operations.',
    type: 'DSA',
    difficulty: 'Hard',
    tags: ['dsa', 'lru', 'hashmap', 'linked-list']
  },

  // HR / Behavioral
  {
    _id: 'q13',
    text: 'Tell me about a time you had a technical disagreement with a teammate or senior architect. How did you resolve it?',
    type: 'HR',
    difficulty: 'Medium',
    tags: ['behavioral', 'conflict-resolution', 'soft-skills']
  },
  {
    _id: 'q14',
    text: 'Describe a high-stress production outage you experienced. How did you debug the root cause and prevent recurrence?',
    type: 'HR',
    difficulty: 'Medium',
    tags: ['behavioral', 'incident-response', 'problem-solving']
  },
  {
    _id: 'q15',
    text: 'Where do you see your technical leadership evolving over the next 3 to 5 years?',
    type: 'HR',
    difficulty: 'Easy',
    tags: ['behavioral', 'career-goals']
  }
];

const users = [
  {
    _id: 'demo-user-id',
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$10$xyz',
    role: 'user'
  }
];

const interviews = [
  {
    _id: 'demo-int-1',
    userId: 'demo-user-id',
    type: 'Frontend Developer',
    startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(),
    overallScore: 8.5,
    status: 'Completed'
  },
  {
    _id: 'demo-int-2',
    userId: 'demo-user-id',
    type: 'DSA Interview',
    startedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 5 + 1500000).toISOString(),
    overallScore: 7.2,
    status: 'Completed'
  }
];

const answers = [
  {
    _id: 'ans-1',
    interviewId: 'demo-int-1',
    questionId: 'q4',
    transcript: 'React uses a virtual representation of the real DOM in memory. When state changes occur, React creates a new VDOM tree, computes the minimal diff algorithm, and updates only changed real DOM nodes.',
    metrics: {
      clarityScore: 9,
      relevanceScore: 9,
      confidenceScore: 8,
      overallScore: 8.7
    },
    aiFeedback: 'Great technical explanation of Virtual DOM diffing algorithm and reconciliation.',
    improvedAnswer: 'React Virtual DOM is an in-memory representation of actual DOM nodes. When state updates, React constructs a new element tree and performs reconciliation using a heuristic O(n) algorithm to calculate minimum batch DOM updates.'
  }
];

module.exports = {
  questions,
  users,
  interviews,
  answers
};
