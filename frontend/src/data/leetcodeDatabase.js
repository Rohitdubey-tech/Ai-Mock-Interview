// Comprehensive LeetCode Problem Suite covering ALL 17 DSA Topics

export const leetcodeDatabase = [
  // 1. ARRAYS & HASHING
  {
    id: '1',
    title: '1. Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: ['Google', 'Amazon', 'Meta'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
    constraints: ['2 <= nums.length <= 10^4'],
    templates: {
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var twoSum = function(nums, target) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[2, 7, 11, 15], 9], expected: '[0,1]' }]
  },
  {
    id: '217',
    title: '217. Contains Duplicate',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companies: ['Amazon', 'Apple', 'Microsoft'],
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array.',
    examples: [{ input: 'nums = [1,2,3,1]', output: 'true' }],
    constraints: ['1 <= nums.length <= 10^5'],
    templates: {
      c: `#include <stdbool.h>\nbool containsDuplicate(int* nums, int numsSize) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var containsDuplicate = function(nums) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[1, 2, 3, 1]], expected: 'true' }]
  },

  // 2. TWO POINTERS
  {
    id: '125',
    title: '125. Valid Palindrome',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    companies: ['Meta', 'Microsoft', 'Apple'],
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: 'true' }],
    constraints: ['1 <= s.length <= 2 * 10^5'],
    templates: {
      c: `#include <stdbool.h>\nbool isPalindrome(char* s) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var isPalindrome = function(s) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: ["A man, a plan, a canal: Panama"], expected: 'true' }]
  },
  {
    id: '15',
    title: '15. 3Sum',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    companies: ['Meta', 'Google', 'Amazon'],
    description: 'Given an integer array `nums`, return all triplets `[nums[i], nums[j], nums[k]]` such that their sum is equal to 0.',
    examples: [{ input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' }],
    constraints: ['3 <= nums.length <= 3000'],
    templates: {
      c: `int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var threeSum = function(nums) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[-1, 0, 1, 2, -1, -4]], expected: '[[-1,-1,2],[-1,0,1]]' }]
  },

  // 3. SLIDING WINDOW
  {
    id: '121',
    title: '121. Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topic: 'Sliding Window',
    companies: ['Amazon', 'Google', 'Microsoft'],
    description: 'Find the maximum profit from choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    constraints: ['1 <= prices.length <= 10^5'],
    templates: {
      c: `int maxProfit(int* prices, int pricesSize) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var maxProfit = function(prices) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[7, 1, 5, 3, 6, 4]], expected: '5' }]
  },
  {
    id: '3',
    title: '3. Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    companies: ['Amazon', 'Google', 'Netflix'],
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    templates: {
      c: `int lengthOfLongestSubstring(char* s) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var lengthOfLongestSubstring = function(s) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: ["abcabcbb"], expected: '3' }]
  },

  // 4. STACK & MONOTONIC STACK
  {
    id: '20',
    title: '20. Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack & Monotonic Stack',
    companies: ['Amazon', 'Google', 'Meta'],
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
    examples: [{ input: 's = "()[]{}"', output: 'true' }],
    constraints: ['1 <= s.length <= 10^4'],
    templates: {
      c: `#include <stdbool.h>\nbool isValid(char* s) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var isValid = function(s) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: ["()[]{}"], expected: 'true' }]
  },
  {
    id: '739',
    title: '739. Daily Temperatures',
    difficulty: 'Medium',
    topic: 'Stack & Monotonic Stack',
    companies: ['Amazon', 'Meta'],
    description: 'Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the i-th day to get a warmer temperature.',
    examples: [{ input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' }],
    constraints: ['1 <= temperatures.length <= 10^5'],
    templates: {
      c: `int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var dailyTemperatures = function(temperatures) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[73,74,75,71,69,72,76,73]], expected: '[1,1,4,2,1,1,0,0]' }]
  },

  // 5. BINARY SEARCH
  {
    id: '704',
    title: '704. Binary Search',
    difficulty: 'Easy',
    topic: 'Binary Search',
    companies: ['Apple', 'Meta'],
    description: 'Given a sorted array `nums` and a `target`, write a function to search `target` in `nums` in O(log n) time.',
    examples: [{ input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' }],
    constraints: ['1 <= nums.length <= 10^4'],
    templates: {
      c: `int search(int* nums, int numsSize, int target) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var search = function(nums, target) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[-1,0,3,5,9,12], 9], expected: '4' }]
  },
  {
    id: '33',
    title: '33. Search in Rotated Sorted Array',
    difficulty: 'Medium',
    topic: 'Binary Search',
    companies: ['Google', 'Amazon', 'Meta'],
    description: 'Search target in a rotated sorted array in O(log n) time complexity.',
    examples: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' }],
    constraints: ['1 <= nums.length <= 5000'],
    templates: {
      c: `int search(int* nums, int numsSize, int target) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var search = function(nums, target) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[4,5,6,7,0,1,2], 0], expected: '4' }]
  },

  // 6. LINKED LIST
  {
    id: '206',
    title: '206. Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked List',
    companies: ['Amazon', 'Apple', 'Google'],
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
    constraints: ['0 <= number of nodes <= 5000'],
    templates: {
      c: `struct ListNode* reverseList(struct ListNode* head) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var reverseList = function(head) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[1,2,3,4,5]], expected: '[5,4,3,2,1]' }]
  },

  // 7. TREES & BINARY SEARCH TREES
  {
    id: '226',
    title: '226. Invert Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees & Binary Search Trees',
    companies: ['Google'],
    description: 'Given the root of a binary tree, invert the tree, and return its root.',
    examples: [{ input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }],
    constraints: ['The number of nodes in the tree is in the range [0, 100].'],
    templates: {
      c: `struct TreeNode* invertTree(struct TreeNode* root) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var invertTree = function(root) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[4,2,7,1,3,6,9]], expected: '[4,7,2,9,6,3,1]' }]
  },
  {
    id: '98',
    title: '98. Validate Binary Search Tree',
    difficulty: 'Medium',
    topic: 'Trees & Binary Search Trees',
    companies: ['Amazon', 'Meta', 'Microsoft'],
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    examples: [{ input: 'root = [2,1,3]', output: 'true' }],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].'],
    templates: {
      c: `#include <stdbool.h>\nbool isValidBST(struct TreeNode* root) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var isValidBST = function(root) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[2,1,3]], expected: 'true' }]
  },

  // 8. HEAP & PRIORITY QUEUE
  {
    id: '215',
    title: '215. Kth Largest Element in an Array',
    difficulty: 'Medium',
    topic: 'Heap & Priority Queue',
    companies: ['Meta', 'Amazon', 'Google'],
    description: 'Given an integer array `nums` and an integer `k`, return the k-th largest element in the array.',
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }],
    constraints: ['1 <= k <= nums.length <= 10^5'],
    templates: {
      c: `int findKthLargest(int* nums, int numsSize, int k) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var findKthLargest = function(nums, k) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[3,2,1,5,6,4], 2], expected: '5' }]
  },

  // 9. TRIE
  {
    id: '208',
    title: '208. Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    topic: 'Trie (Prefix Tree)',
    companies: ['Google', 'Amazon'],
    description: 'A trie or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.',
    examples: [{ input: 'Trie trie = new Trie(); trie.insert("apple"); trie.search("apple"); // returns true', output: 'true' }],
    constraints: ['1 <= word.length <= 2000'],
    templates: {
      c: `typedef struct {\n    // TODO: Implement Trie struct\n} Trie;\n\nTrie* trieCreate() {\n    \n}\n\nvoid trieInsert(Trie* obj, char* word) {\n    \n}\n\nbool trieSearch(Trie* obj, char* word) {\n    \n}\n\nbool trieStartsWith(Trie* obj, char* prefix) {\n    \n}`,
      cpp: `class Trie {\npublic:\n    Trie() {\n        // TODO: Implement constructor\n    }\n    void insert(string word) {\n        \n    }\n    bool search(string word) {\n        \n    }\n    bool startsWith(string prefix) {\n        \n    }\n};`,
      java: `class Trie {\n    public Trie() {\n        // TODO: Implement constructor\n    }\n    public void insert(String word) {\n        \n    }\n    public boolean search(String word) {\n        \n    }\n    public boolean startsWith(String prefix) {\n        \n    }\n}`,
      python: `class Trie:\n    def __init__(self):\n        pass\n    def insert(self, word: str) -> None:\n        pass\n    def search(self, word: str) -> bool:\n        pass\n    def startsWith(self, prefix: str) -> bool:\n        pass`,
      javascript: `var Trie = function() {\n    // TODO: Implement constructor\n};\nTrie.prototype.insert = function(word) {\n    \n};\nTrie.prototype.search = function(word) {\n    \n};\nTrie.prototype.startsWith = function(prefix) {\n    \n};`
    },
    testCases: [{ input: ["insert(apple), search(apple)"], expected: 'true' }]
  },

  // 10. BACKTRACKING & RECURSION
  {
    id: '78',
    title: '78. Subsets',
    difficulty: 'Medium',
    topic: 'Backtracking & Recursion',
    companies: ['Amazon', 'Meta', 'Google'],
    description: 'Given an integer array `nums` of unique elements, return all possible subsets (the power set).',
    examples: [{ input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }],
    constraints: ['1 <= nums.length <= 10'],
    templates: {
      c: `int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `import java.util.*;\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var subsets = function(nums) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[1, 2, 3]], expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }]
  },

  // 11. GRAPHS
  {
    id: '200',
    title: '200. Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs (BFS/DFS)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Given an `m x n` 2D binary grid representing a map of land (`1`) and water (`0`), return the number of islands.',
    examples: [{ input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }],
    constraints: ['1 <= m, n <= 300'],
    templates: {
      c: `int numIslands(char** grid, int gridSize, int* gridColSize) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var numIslands = function(grid) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[["1","1","0"],["1","1","0"],["0","0","1"]]], expected: '2' }]
  },

  // 12. DYNAMIC PROGRAMMING
  {
    id: '70',
    title: '70. Climbing Stairs',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    companies: ['Amazon', 'Google'],
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps.',
    examples: [{ input: 'n = 2', output: '2' }],
    constraints: ['1 <= n <= 45'],
    templates: {
      c: `int climbStairs(int n) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var climbStairs = function(n) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [2], expected: '2' }]
  },
  {
    id: '322',
    title: '322. Coin Change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: ['Amazon', 'Google', 'Uber'],
    description: 'Return the fewest number of coins that you need to make up that amount.',
    examples: [{ input: 'coins = [1,2,5], amount = 11', output: '3' }],
    constraints: ['1 <= coins.length <= 12'],
    templates: {
      c: `int coinChange(int* coins, int coinsSize, int amount) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var coinChange = function(coins, amount) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[1, 2, 5], 11], expected: '3' }]
  },

  // 13. GREEDY ALGORITHMS
  {
    id: '53',
    title: '53. Maximum Subarray (Kadanes Algo)',
    difficulty: 'Medium',
    topic: 'Greedy Algorithms',
    companies: ['Amazon', 'Google', 'Microsoft'],
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' }],
    constraints: ['1 <= nums.length <= 10^5'],
    templates: {
      c: `int maxSubArray(int* nums, int numsSize) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var maxSubArray = function(nums) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: '6' }]
  },

  // 14. BIT MANIPULATION
  {
    id: '191',
    title: '191. Number of 1 Bits',
    difficulty: 'Easy',
    topic: 'Bit Manipulation',
    companies: ['Apple', 'Microsoft'],
    description: 'Write a function that takes the binary representation of a positive integer and returns the number of set bits (hamming weight).',
    examples: [{ input: 'n = 11 (binary 1011)', output: '3' }],
    constraints: ['1 <= n <= 2^31 - 1'],
    templates: {
      c: `int hammingWeight(uint32_t n) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `class Solution {\npublic:\n    int hammingWeight(uint32_t n) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int hammingWeight(int n) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def hammingWeight(self, n: int) -> int:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var hammingWeight = function(n) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [11], expected: '3' }]
  },

  // 15. INTERVALS & MATRIX
  {
    id: '56',
    title: '56. Merge Intervals',
    difficulty: 'Medium',
    topic: 'Intervals & Matrix',
    companies: ['Amazon', 'Meta', 'Google'],
    description: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals.',
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
    constraints: ['1 <= intervals.length <= 10^4'],
    templates: {
      c: `int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var merge = function(intervals) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[[1,3],[2,6],[8,10],[15,18]]], expected: '[[1,6],[8,10],[15,18]]' }]
  },

  // 16. MATH & GEOMETRY
  {
    id: '66',
    title: '66. Plus One',
    difficulty: 'Easy',
    topic: 'Math & Geometry',
    companies: ['Google'],
    description: 'You are given a large integer represented as an integer array `digits`. Increment the large integer by one and return the resulting array of digits.',
    examples: [{ input: 'digits = [1,2,3]', output: '[1,2,4]' }],
    constraints: ['1 <= digits.length <= 100'],
    templates: {
      c: `int* plusOne(int* digits, int digitsSize, int* returnSize) {\n    // TODO: Implement your solution here\n    \n}`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        // TODO: Implement your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int[] plusOne(int[] digits) {\n        // TODO: Implement your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def plusOne(self, digits: list[int]) -> list[int]:\n        # TODO: Implement your solution here\n        pass`,
      javascript: `var plusOne = function(digits) {\n    // TODO: Implement your solution here\n    \n};`
    },
    testCases: [{ input: [[1,2,3]], expected: '[1,2,4]' }]
  },

  // 17. DATA STRUCTURE DESIGN
  {
    id: '146',
    title: '146. LRU Cache',
    difficulty: 'Hard',
    topic: 'Data Structure Design',
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    examples: [{ input: 'LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); lRUCache.get(1); // 1', output: '1' }],
    constraints: ['1 <= capacity <= 3000'],
    templates: {
      c: `typedef struct {\n    // TODO: Define struct properties\n} LRUCache;\n\nLRUCache* lRUCacheCreate(int capacity) {\n    \n}\n\nint lRUCacheGet(LRUCache* obj, int key) {\n    \n}\n\nvoid lRUCachePut(LRUCache* obj, int key, int value) {\n    \n}`,
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // TODO: Implement constructor\n    }\n    int get(int key) {\n        \n    }\n    void put(int key, int value) {\n        \n    }\n};`,
      java: `class LRUCache {\n    public LRUCache(int capacity) {\n        // TODO: Implement constructor\n    }\n    public int get(int key) {\n        \n    }\n    public void put(int key, int value) {\n        \n    }\n}`,
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass`,
      javascript: `var LRUCache = function(capacity) {\n    // TODO: Implement constructor\n};\nLRUCache.prototype.get = function(key) {\n    \n};\nLRUCache.prototype.put = function(key, value) {\n    \n};`
    },
    testCases: [{ input: ["LRUCache(2), put(1,1), get(1)"], expected: '1' }]
  }
];
