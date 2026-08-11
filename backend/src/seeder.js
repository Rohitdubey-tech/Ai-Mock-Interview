const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const questions = [
  // System Design
  {
    text: 'Design a URL shortening service like Bitly. Focus on the data model, scaling read traffic, and generating unique short hashes.',
    type: 'System Design',
    difficulty: 'Hard',
    tags: ['system design', 'scalability', 'hashing', 'databases'],
  },
  {
    text: 'How would you design a distributed cache system like Memcached or Redis?',
    type: 'System Design',
    difficulty: 'Hard',
    tags: ['system design', 'cache', 'distributed systems'],
  },
  {
    text: 'Design a scalable real-time notification service supporting Push, Email, and SMS for 10 million active daily users.',
    type: 'System Design',
    difficulty: 'Medium',
    tags: ['system design', 'notifications', 'pubsub', 'kafka'],
  },

  // Frontend
  {
    text: 'Explain the mechanism of React Virtual DOM, reconciliation diffing, and how keys prevent unnecessary DOM re-renders.',
    type: 'Frontend',
    difficulty: 'Medium',
    tags: ['react', 'frontend', 'virtual-dom', 'performance'],
  },
  {
    text: 'What is Event Delegation in JavaScript? How do event bubbling, target propagation, and stopPropagation work?',
    type: 'Frontend',
    difficulty: 'Easy',
    tags: ['javascript', 'frontend', 'dom', 'events'],
  },
  {
    text: 'How do micro-frontends work? Discuss module federation, isolated state management, and asset loading strategies.',
    type: 'Frontend',
    difficulty: 'Hard',
    tags: ['frontend', 'architecture', 'webpack', 'microfrontends'],
  },

  // Backend
  {
    text: 'Explain the Node.js Event Loop architecture. What are microtasks vs macrotasks, process.nextTick, and non-blocking I/O?',
    type: 'Backend',
    difficulty: 'Medium',
    tags: ['backend', 'nodejs', 'eventloop', 'async'],
  },
  {
    text: 'How do ACID transactions work in relational databases versus BASE principles in distributed NoSQL databases?',
    type: 'Backend',
    difficulty: 'Hard',
    tags: ['backend', 'databases', 'sql', 'nosql'],
  },
  {
    text: 'Describe OAuth 2.0 PKCE flow for single page applications and mobile clients. Why is client secret omission secure?',
    type: 'Backend',
    difficulty: 'Medium',
    tags: ['backend', 'security', 'auth', 'oauth'],
  },

  // DSA
  {
    text: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution.',
    type: 'DSA',
    difficulty: 'Easy',
    tags: ['dsa', 'arrays', 'hash table'],
  },
  {
    text: 'Given the root of a binary tree, invert the tree and return its root. Discuss both recursive O(H) stack space and BFS queue approach.',
    type: 'DSA',
    difficulty: 'Easy',
    tags: ['dsa', 'trees', 'recursion'],
  },
  {
    text: 'Implement an O(1) LRU (Least Recently Used) Cache supporting get(key) and put(key, value) operations.',
    type: 'DSA',
    difficulty: 'Hard',
    tags: ['dsa', 'lru', 'hashmap', 'doubly-linked-list'],
  },

  // HR / Behavioral
  {
    text: 'Tell me about a time you had a technical conflict with a team member. How did you navigate the conversation to reach consensus?',
    type: 'HR',
    difficulty: 'Medium',
    tags: ['behavioral', 'conflict resolution', 'communication'],
  },
  {
    text: 'Describe a project where you had to learn a new technology stack on tight deadlines. What was your strategic approach?',
    type: 'HR',
    difficulty: 'Medium',
    tags: ['behavioral', 'adaptability', 'learning'],
  },
  {
    text: 'Tell me about a time a critical feature you deployed broke in production. How did you handle emergency incident management and post-mortem review?',
    type: 'HR',
    difficulty: 'Hard',
    tags: ['behavioral', 'ownership', 'incident-response'],
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    await Question.deleteMany();
    console.log('Existing questions cleared.');
    
    await Question.insertMany(questions);
    console.log('Sample questions inserted successfully.');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data (or MongoDB server offline):', error.message);
    process.exit(0);
  }
};

seedDB();

