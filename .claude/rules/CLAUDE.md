# DSA Studio - Comprehensive Learning Platform

> **Agent docs:** Entry point `.claude/CLAUDE.md` · Memory `MEMORY.md` · Skills `SKILLS.md` · Plan `PLAN.md` · Phases `PLAN_PHASE.md` · Tasks `TASKS.md` · Modular specs in `.claude/specs/`

## Project Vision
**DSA Studio** is an intelligent, progressive learning platform for mastering Data Structures and Algorithms through structured practice, personalized tracking, and AI-powered assistance. The platform enables learners to progress from basic to advanced concepts while maintaining a comprehensive record of their learning journey.

---

## Table of Contents
1. [Core Features](#core-features)
2. [System Architecture](#system-architecture)
3. [Data Model](#data-model)
4. [Feature Specifications](#feature-specifications)
5. [Algorithm & Data Structure Library](#algorithm--data-structure-library)
6. [Question Bank System](#question-bank-system)
7. [Daily Tracker & Analytics](#daily-tracker--analytics)
8. [User Interface Components](#user-interface-components)
9. [API Endpoints](#api-endpoints)
10. [Technical Stack](#technical-stack)
11. [Implementation Roadmap](#implementation-roadmap)

---

## Core Features

### 1. **Structured Learning Paths**
- Comprehensive coverage of DSA topics organized by difficulty (Basic → Intermediate → Advanced)
- Topic-wise progression with pre-requisite tracking
- Curated learning sequences for interview preparation, competitive programming, and academic study

### 2. **Multi-Level Practice Questions**
- **Basic Level**: Conceptual understanding and simple implementations
- **Intermediate Level**: Problem-solving with constraints and optimizations
- **Advanced Level**: Complex scenarios, edge cases, and competitive programming challenges
- Each question includes: problem statement, constraints, test cases, hints, and detailed solutions

### 3. **External Question Integration**
- Upload questions from external sources (LeetCode, HackerRank, CodeForces, interviews)
- Manual question creation with rich text editor
- Bulk import via CSV/JSON
- Tag and categorize custom questions
- Automatic difficulty classification using AI

### 4. **Persistent Database Storage**
- All questions, solutions, and user attempts stored in backend database
- Version control for question edits
- Solution history tracking
- Bookmarking and favorites system
- Notes and annotations on questions

### 5. **Daily Learning Tracker**
- Track daily practice sessions with metrics
- Visualize progress over time with charts and heatmaps
- Set and monitor daily/weekly goals
- Streak tracking and gamification
- Performance analytics per topic and difficulty level

### 6. **AI-Powered Chatbot Assistant**
- Instant clarification of DSA concepts
- Code review and optimization suggestions
- Hint system for stuck problems
- Explanation of time/space complexity
- Interview preparation guidance

### 7. **Revision Management System**
- Spaced repetition algorithm for optimal revision scheduling
- Mark questions for revision based on difficulty or mistakes
- Quick access to previously attempted questions
- Flashcards for concept review

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React/Next.js)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Learning │  │ Practice │  │  Tracker │  │ Chatbot  │   │
│  │   Hub    │  │  Arena   │  │Dashboard │  │Assistant │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Layer (Express/FastAPI)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Question │  │   User   │  │Analytics │  │   AI     │   │
│  │   API    │  │   API    │  │   API    │  │  API     │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Database Layer (PostgreSQL/MongoDB)             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Questions │  │Solutions │  │  Users   │  │ Activity │   │
│  │   DB     │  │    DB    │  │Progress  │  │   Logs   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              External Services & Integrations                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   AI/ML  │  │  Code    │  │Analytics │  │  Storage │   │
│  │  Models  │  │Execution │  │ Service  │  │ (S3/GCS) │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Model

### **1. Users Table**
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    learning_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
    target_goal TEXT,
    daily_target INT DEFAULT 3, -- questions per day
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    total_questions_solved INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0
);
```

### **2. Topics Table**
```sql
CREATE TABLE topics (
    topic_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50), -- Arrays, Strings, Trees, Graphs, DP, etc.
    description TEXT,
    difficulty_level VARCHAR(20), -- basic, intermediate, advanced
    prerequisites JSONB, -- Array of prerequisite topic_ids
    total_questions INT DEFAULT 0,
    icon_url TEXT,
    order_index INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **3. Questions Table**
```sql
CREATE TABLE questions (
    question_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topics(topic_id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL, -- basic, intermediate, advanced
    constraints TEXT,
    input_format TEXT,
    output_format TEXT,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    hints JSONB, -- Array of progressive hints
    tags JSONB, -- Array of tags
    source VARCHAR(50), -- internal, leetcode, hackerrank, custom
    source_url TEXT,
    is_premium BOOLEAN DEFAULT false,
    acceptance_rate DECIMAL(5,2),
    total_attempts INT DEFAULT 0,
    total_solved INT DEFAULT 0,
    created_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

### **4. Test Cases Table**
```sql
CREATE TABLE test_cases (
    test_case_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES questions(question_id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    explanation TEXT,
    is_sample BOOLEAN DEFAULT false, -- visible to users
    is_hidden BOOLEAN DEFAULT false, -- for final evaluation
    order_index INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **5. Solutions Table**
```sql
CREATE TABLE solutions (
    solution_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES questions(question_id) ON DELETE CASCADE,
    language VARCHAR(30) NOT NULL, -- python, javascript, java, cpp, etc.
    approach_name VARCHAR(100), -- Brute Force, Optimized, Two Pointer, etc.
    code TEXT NOT NULL,
    explanation TEXT,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    is_optimal BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(user_id),
    upvotes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **6. User Attempts Table**
```sql
CREATE TABLE user_attempts (
    attempt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(question_id) ON DELETE CASCADE,
    language VARCHAR(30),
    submitted_code TEXT,
    status VARCHAR(20), -- accepted, wrong_answer, time_limit, runtime_error, incomplete
    test_cases_passed INT DEFAULT 0,
    total_test_cases INT,
    execution_time DECIMAL(10,2), -- in milliseconds
    memory_used DECIMAL(10,2), -- in MB
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT, -- user's notes for this attempt
    is_bookmarked BOOLEAN DEFAULT false,
    difficulty_rating INT, -- user's subjective difficulty (1-5)
    UNIQUE(user_id, question_id, attempted_at)
);
```

### **7. User Progress Table**
```sql
CREATE TABLE user_progress (
    progress_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(question_id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(topic_id),
    status VARCHAR(20), -- not_attempted, attempted, solved, mastered
    first_attempt_date TIMESTAMP,
    last_attempt_date TIMESTAMP,
    solved_date TIMESTAMP,
    total_attempts INT DEFAULT 0,
    time_spent_minutes INT DEFAULT 0, -- cumulative time
    best_execution_time DECIMAL(10,2),
    need_revision BOOLEAN DEFAULT false,
    next_revision_date TIMESTAMP,
    revision_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id)
);
```

### **8. Daily Activity Table**
```sql
CREATE TABLE daily_activity (
    activity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    questions_attempted INT DEFAULT 0,
    questions_solved INT DEFAULT 0,
    time_spent_minutes INT DEFAULT 0,
    topics_covered JSONB, -- Array of topic names
    streak_day INT,
    daily_goal_met BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, activity_date)
);
```

### **9. Revision Queue Table**
```sql
CREATE TABLE revision_queue (
    queue_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(question_id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    priority INT DEFAULT 1, -- 1 (low) to 5 (high)
    reason VARCHAR(50), -- spaced_repetition, marked_for_review, got_wrong
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id, scheduled_date)
);
```

### **10. User Notes Table**
```sql
CREATE TABLE user_notes (
    note_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(question_id) ON DELETE CASCADE,
    note_text TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **11. Custom Questions Table**
```sql
CREATE TABLE custom_questions (
    custom_question_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(question_id) ON DELETE CASCADE,
    source_name VARCHAR(100), -- e.g., "Google Interview 2024", "LeetCode Contest 123"
    source_url TEXT,
    import_method VARCHAR(20), -- manual, csv, json, api
    original_content JSONB, -- store original format if imported
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Feature Specifications

### **Feature 1: Topic-Based Learning Hub**

#### Description
A comprehensive library of DSA topics organized hierarchically with prerequisite tracking and visual learning aids.

#### Components
1. **Topic Browser**
   - Grid/List view of all topics
   - Filter by category, difficulty, completion status
   - Search functionality
   - Visual progress indicators

2. **Topic Detail Page**
   - Theory section with interactive examples
   - Time/Space complexity analysis
   - Visual aids (diagrams, animations)
   - Related topics and prerequisites
   - Curated question list (Basic → Intermediate → Advanced)

3. **Learning Path Generator**
   - AI-suggested learning sequence based on user level
   - Prerequisite validation
   - Customizable roadmaps

#### User Stories
- As a learner, I want to see all topics organized by category so I can navigate easily
- As a beginner, I want to see prerequisites before starting a topic
- As an advanced user, I want to filter topics by difficulty to focus on challenging content

---

### **Feature 2: Multi-Level Practice System**

#### Description
Comprehensive question bank with three difficulty levels per topic, complete with test cases, hints, and detailed solutions.

#### Question Structure
Each question must include:
1. **Problem Statement**: Clear description with examples
2. **Constraints**: Input size, value ranges, edge cases
3. **Input/Output Format**: Precise specifications
4. **Sample Test Cases**: 2-3 visible examples with explanations
5. **Hidden Test Cases**: For evaluation (edge cases, performance tests)
6. **Hints**: Progressive hints (3-5 levels) that don't give away the solution
7. **Multiple Solutions**: 
   - Brute force approach
   - Optimized approach
   - Alternative methods
8. **Solution Explanations**: Step-by-step breakdown with complexity analysis

#### Example Question Format

**Topic: Arrays → Two Pointers**  
**Difficulty: Intermediate**

**Problem: Container With Most Water**

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.

**Constraints:**
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

**Examples:**

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The vertical lines at indices 1 and 8 form a container with area = 7 * 7 = 49

Input: height = [1,1]
Output: 1
```

**Hints:**
1. Think about what determines the area of water between two lines
2. Consider starting with the widest possible container
3. How can you decide which pointer to move to potentially find a larger area?
4. The height of the container is limited by the shorter line

**Solutions:**

*Solution 1: Brute Force (Python)*
```python
def maxArea(height):
    """
    Time Complexity: O(n^2)
    Space Complexity: O(1)
    """
    max_area = 0
    n = len(height)
    
    for i in range(n):
        for j in range(i + 1, n):
            width = j - i
            h = min(height[i], height[j])
            max_area = max(max_area, width * h)
    
    return max_area
```

*Solution 2: Two Pointer Optimal (Python)*
```python
def maxArea(height):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    
    Approach: Start with widest container, move pointer with shorter height inward
    """
    max_area = 0
    left, right = 0, len(height) - 1
    
    while left < right:
        # Calculate current area
        width = right - left
        h = min(height[left], height[right])
        max_area = max(max_area, width * h)
        
        # Move the pointer pointing to shorter line
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area
```

**Why Two Pointer Works:**
At each step, we eliminate one line from consideration. We choose to eliminate the shorter line because:
- Moving the taller line inward can only decrease both width and height
- Moving the shorter line inward might find a taller line that compensates for the reduced width

---

### **Feature 3: External Question Import System**

#### Description
Allow users to add questions from external sources and store them permanently in the database.

#### Import Methods

**1. Manual Entry**
- Rich text editor for problem description
- Form fields for all question metadata
- Test case builder interface
- Solution code editor with syntax highlighting
- Preview before submission

**2. CSV Bulk Import**
CSV Format:
```csv
title,description,difficulty,topic,tags,input_format,output_format,sample_input,sample_output,hints,solution_code,time_complexity,space_complexity
"Two Sum","Given array find two indices...",basic,arrays,"[array,hash-table]","First line: n...",...",[1,2,3]","[0,2]","[Try hash map,...]","def twoSum...",O(n),O(n)
```

**3. JSON Import**
```json
{
  "questions": [
    {
      "title": "Valid Parentheses",
      "description": "Given a string containing...",
      "difficulty": "basic",
      "topic": "stack",
      "tags": ["string", "stack"],
      "testCases": [
        {
          "input": "()",
          "output": "true",
          "explanation": "Balanced parentheses"
        }
      ],
      "solutions": [
        {
          "language": "python",
          "code": "def isValid(s):\n    ...",
          "approach": "Stack",
          "complexity": {
            "time": "O(n)",
            "space": "O(n)"
          }
        }
      ]
    }
  ]
}
```

**4. LeetCode/HackerRank URL Import**
- Paste URL from supported platforms
- Auto-scrape question details
- Import test cases if available
- User adds custom notes/solutions

**5. AI-Assisted Import**
- Paste raw problem text
- AI extracts structured data
- User reviews and confirms
- Automatic difficulty classification

#### Storage Workflow
```
External Question Input
         ↓
Validation & Parsing
         ↓
AI Classification (auto-tag, difficulty)
         ↓
Store in questions table
         ↓
Link to custom_questions table
         ↓
Create test cases
         ↓
Available in user's question bank
```

---

### **Feature 4: Daily Tracker & Analytics Dashboard**

#### Description
Comprehensive tracking system to monitor learning progress with visual analytics and goal management.

#### Dashboard Components

**1. Daily Summary Card**
```
┌─────────────────────────────────────────┐
│  📅 Today - May 22, 2026                │
│                                          │
│  ✅ Questions Solved: 5 / 3 (Goal Met!) │
│  ⏱️  Time Spent: 2h 35m                 │
│  🎯 Topics: Arrays, Binary Search        │
│  🔥 Streak: 12 days                     │
└─────────────────────────────────────────┘
```

**2. Weekly Overview**
- Heatmap showing daily activity
- Bar chart of questions solved per day
- Time spent trend line
- Topic distribution pie chart

**3. Progress Metrics**
```
Total Questions Solved: 247 / 500 (49.4%)
├─ Basic: 120 / 150 (80%)
├─ Intermediate: 95 / 200 (47.5%)
└─ Advanced: 32 / 150 (21.3%)

Topics Mastered: 8 / 20
Current Focus: Dynamic Programming (65% complete)
```

**4. Performance Analytics**
- Average time per question by difficulty
- Success rate trends
- Strong/weak topics identification
- Comparison with platform averages

**5. Streak Tracker**
```
Current Streak: 🔥 12 days
Longest Streak: 🏆 28 days
Total Active Days: 89 / 120 days
```

**6. Calendar View**
- Monthly calendar with color-coded activity levels
- Click on date to see detailed activity
- Goal achievement indicators

**7. Goals & Milestones**
- Set daily/weekly/monthly targets
- Progress bars for each goal
- Achievement badges
- Milestone notifications

#### Tracking Features

**Auto-Tracking:**
- Every question attempt logged automatically
- Session start/end timestamps
- Idle time detection and exclusion
- Background timer for active coding time

**Manual Logging:**
- Add practice sessions from external platforms
- Log interview preparation activities
- Add notes for study sessions

**Spaced Repetition Integration:**
- Questions marked for revision appear in dashboard
- "Due for Review" section with priority
- One-click revision session starter

**Analytics Insights:**
- Best time of day for problem-solving
- Topic difficulty progression
- Learning velocity (questions/week trend)
- Estimated completion date for goals

---

### **Feature 5: Revision Management System**

#### Description
Intelligent revision scheduling using spaced repetition to ensure long-term retention.

#### Spaced Repetition Algorithm

**Schedule Intervals:**
1. First review: 1 day after solving
2. Second review: 3 days after first review
3. Third review: 7 days after second review
4. Fourth review: 14 days after third review
5. Fifth review: 30 days after fourth review

**Priority Calculation:**
```python
def calculate_priority(question_data):
    priority = 1  # Base priority
    
    # Increase if got wrong multiple times
    if question_data['wrong_attempts'] > 2:
        priority += 2
    
    # Increase if marked as difficult by user
    if question_data['user_difficulty_rating'] >= 4:
        priority += 1
    
    # Increase if overdue for revision
    days_overdue = (today - question_data['next_revision_date']).days
    if days_overdue > 0:
        priority += min(days_overdue // 3, 2)
    
    # Increase for advanced questions
    if question_data['difficulty'] == 'advanced':
        priority += 1
    
    return min(priority, 5)  # Cap at 5
```

#### Revision Dashboard
```
📚 Due for Revision Today: 8 questions

High Priority (5) 🔴
- Binary Tree Maximum Path Sum (Advanced)
- Longest Increasing Subsequence (Intermediate)

Medium Priority (3) 🟡
- Valid Parentheses (Basic)
- Merge Intervals (Intermediate)
- ...

🗓️ Upcoming This Week: 15 questions
✅ Reviewed This Week: 12 questions
```

---

### **Feature 6: AI-Powered Chatbot Assistant**

#### Description
Intelligent chatbot to assist with DSA concepts, hint generation, code review, and learning guidance.

#### Chatbot Capabilities

**1. Concept Explanation**
```
User: Explain dynamic programming
Bot: Dynamic programming is an optimization technique that solves 
     complex problems by breaking them down into simpler subproblems...
     [Shows visual diagram]
     Would you like to see examples or practice problems?
```

**2. Progressive Hints**
```
User: I'm stuck on "Coin Change" problem
Bot: Let me give you a hint without spoiling the solution:
     
     Hint 1: Think about the smallest subproblem - what if you 
             only had to make change for 1 cent?
     
     [User clicks "Need another hint"]
     
     Hint 2: Can you build up solutions for larger amounts using 
             solutions for smaller amounts?
     
     [User clicks "Show approach"]
     
     Bot: This is a classic DP problem. Consider dp[i] = minimum 
          coins needed to make amount i...
```

**3. Code Review**
```
User: [Submits code for review]
Bot: I've analyzed your solution for "Two Sum":
     
     ✅ Correct logic
     ⚠️  Time complexity: O(n²) - Can be optimized to O(n)
     💡 Suggestion: Use a hash map to store complements
     
     Would you like to see the optimized version?
```

**4. Complexity Analysis**
```
User: What's the time complexity of my nested loop solution?
Bot: Your solution has:
     - Outer loop: O(n)
     - Inner loop: O(n)
     - Total: O(n²)
     
     The space complexity is O(1) as you're using constant extra space.
```

**5. Interview Prep**
```
User: How should I approach system design interviews?
Bot: Here's a structured approach:
     1. Clarify requirements (5 min)
     2. High-level design (10 min)
     3. Detailed component design (15 min)
     ...
     
     Would you like to practice with a mock interview question?
```

---

## Algorithm & Data Structure Library

### **Complete Topic Hierarchy**

#### **1. Arrays & Strings**
**Basic Topics:**
- Array Traversal & Manipulation
- Two Pointer Technique
- Sliding Window (Fixed Size)
- String Manipulation & Reversal
- Prefix Sum

**Intermediate Topics:**
- Sliding Window (Variable Size)
- Kadane's Algorithm
- Dutch National Flag
- Merge Intervals
- String Pattern Matching

**Advanced Topics:**
- Segment Trees
- Fenwick Tree (BIT)
- Rabin-Karp Algorithm
- KMP Algorithm
- Z-Algorithm

---

#### **2. Linked Lists**
**Basic Topics:**
- Singly Linked List Operations
- Doubly Linked List
- Cycle Detection (Floyd's Algorithm)
- Reverse Linked List
- Middle of Linked List

**Intermediate Topics:**
- Merge Two Sorted Lists
- Remove Nth Node from End
- Intersection of Two Lists
- Palindrome Linked List
- Copy List with Random Pointer

**Advanced Topics:**
- LRU Cache Implementation
- Reverse Nodes in k-Group
- Merge k Sorted Lists
- Skip List

---

#### **3. Stacks & Queues**
**Basic Topics:**
- Stack Implementation
- Queue Implementation
- Valid Parentheses
- Implement Stack using Queues
- Implement Queue using Stacks

**Intermediate Topics:**
- Next Greater Element
- Min Stack
- Monotonic Stack Problems
- Circular Queue
- Deque Operations

**Advanced Topics:**
- Largest Rectangle in Histogram
- Maximal Rectangle
- Sliding Window Maximum
- Expression Evaluation
- Design Browser History

---

#### **4. Trees**
**Basic Topics:**
- Binary Tree Traversals (Inorder, Preorder, Postorder)
- Level Order Traversal
- Tree Height & Depth
- Symmetric Tree
- Path Sum

**Intermediate Topics:**
- Binary Search Tree Operations
- Lowest Common Ancestor
- Serialize & Deserialize Tree
- Diameter of Binary Tree
- Validate BST

**Advanced Topics:**
- AVL Tree
- Red-Black Tree
- Segment Tree
- Fenwick Tree
- Trie (Prefix Tree)
- Suffix Tree

---

#### **5. Graphs**
**Basic Topics:**
- Graph Representation (Adjacency Matrix/List)
- BFS (Breadth-First Search)
- DFS (Depth-First Search)
- Connected Components
- Cycle Detection

**Intermediate Topics:**
- Dijkstra's Algorithm
- Bellman-Ford Algorithm
- Topological Sort
- Kahn's Algorithm
- Union-Find (Disjoint Set)

**Advanced Topics:**
- Floyd-Warshall Algorithm
- Prim's Algorithm
- Kruskal's Algorithm
- Tarjan's Algorithm (SCC)
- A* Search Algorithm
- Network Flow (Ford-Fulkerson)

---

#### **6. Dynamic Programming**
**Basic Topics:**
- Fibonacci Numbers
- Climbing Stairs
- House Robber
- Min Cost Climbing Stairs
- Coin Change (Unbounded Knapsack)

**Intermediate Topics:**
- 0/1 Knapsack
- Longest Common Subsequence
- Longest Increasing Subsequence
- Edit Distance
- Maximum Subarray

**Advanced Topics:**
- Matrix Chain Multiplication
- Palindrome Partitioning
- Word Break II
- Burst Balloons
- Regex Matching
- Wildcard Matching

---

#### **7. Backtracking**
**Basic Topics:**
- Generate Subsets
- Generate Permutations
- Combinations
- Letter Case Permutation

**Intermediate Topics:**
- N-Queens Problem
- Sudoku Solver
- Word Search
- Palindrome Partitioning
- Generate Parentheses

**Advanced Topics:**
- Rat in a Maze
- Hamiltonian Path
- Graph Coloring
- Crossword Puzzle Solver

---

#### **8. Greedy Algorithms**
**Basic Topics:**
- Activity Selection
- Fractional Knapsack
- Minimum Coins
- Jump Game

**Intermediate Topics:**
- Job Sequencing
- Huffman Coding
- Interval Scheduling
- Gas Station

**Advanced Topics:**
- Minimum Spanning Tree
- Task Scheduler
- Candy Distribution
- Partition Labels

---

#### **9. Heap (Priority Queue)**
**Basic Topics:**
- Min Heap & Max Heap
- Kth Largest Element
- Top K Frequent Elements
- Merge k Sorted Lists

**Intermediate Topics:**
- Find Median from Data Stream
- Reorganize String
- Meeting Rooms II
- Task Scheduler

**Advanced Topics:**
- Sliding Window Median
- IPO Problem
- Maximum Performance of Team

---

#### **10. Hashing**
**Basic Topics:**
- Hash Map Basics
- Two Sum
- Contains Duplicate
- Valid Anagram
- Group Anagrams

**Intermediate Topics:**
- Subarray Sum Equals K
- Longest Consecutive Sequence
- Copy List with Random Pointer
- LRU Cache

**Advanced Topics:**
- Design HashMap
- Custom Hash Function
- Rolling Hash
- Count of Range Sum

---

#### **11. Bit Manipulation**
**Basic Topics:**
- Bitwise Operators
- Count Set Bits
- Power of Two
- Single Number
- Reverse Bits

**Intermediate Topics:**
- Missing Number
- Sum of Two Integers (without +/-)
- Bitwise AND of Range
- XOR Operations

**Advanced Topics:**
- Maximum XOR of Two Numbers
- Counting Bits
- Gray Code
- Hamming Distance

---

#### **12. Mathematical & Number Theory**
**Basic Topics:**
- Prime Numbers (Sieve of Eratosthenes)
- GCD & LCM
- Factorial
- Power Function
- Fibonacci

**Intermediate Topics:**
- Modular Arithmetic
- Fast Exponentiation
- Combination & Permutation
- Pascal's Triangle

**Advanced Topics:**
- Chinese Remainder Theorem
- Fermat's Little Theorem
- Euler's Totient Function
- Number Theory Algorithms

---

#### **13. Sorting & Searching**
**Basic Topics:**
- Bubble Sort
- Selection Sort
- Insertion Sort
- Linear Search
- Binary Search

**Intermediate Topics:**
- Merge Sort
- Quick Sort
- Heap Sort
- Binary Search Variations
- Search in Rotated Array

**Advanced Topics:**
- Counting Sort
- Radix Sort
- Bucket Sort
- Ternary Search
- Exponential Search

---

## Question Bank System

### **Question Distribution Per Topic**

Each topic should have:
- **Basic Level**: 10-15 questions
- **Intermediate Level**: 15-20 questions
- **Advanced Level**: 8-12 questions

**Total Questions Target: 500-700 questions**

### **Question Quality Standards**

Every question must have:
1. ✅ Clear problem statement with examples
2. ✅ Well-defined constraints
3. ✅ At least 3 sample test cases with explanations
4. ✅ At least 5 hidden test cases covering edge cases
5. ✅ 3-5 progressive hints
6. ✅ Multiple solution approaches (brute force + optimal)
7. ✅ Detailed explanation with complexity analysis
8. ✅ Real-world application context

---

## User Interface Components

### **1. Dashboard Page**
```
┌──────────────────────────────────────────────────────────┐
│  [🏠 DSA Studio]  [📚 Learn]  [💻 Practice]  [📊 Track]  │
└──────────────────────────────────────────────────────────┘

┌─────────────────────┬────────────────────────────────────┐
│  Quick Stats        │   Daily Tracker                    │
│  ─────────────      │   ─────────────                    │
│  🎯 Streak: 12 days │   📅 May 22, 2026                 │
│  ✅ Solved: 247     │   ✅ Solved Today: 5 / 3          │
│  📚 Topics: 8/20    │   ⏱️  Time: 2h 35m                │
│  🏆 Rank: 1,234     │   🔥 Goal Met!                     │
├─────────────────────┴────────────────────────────────────┤
│  📖 Continue Learning                                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Dynamic Programming (65% complete)              │   │
│  │  Next: Longest Common Subsequence                │   │
│  │  [Continue →]                                    │   │
│  └──────────────────────────────────────────────────┘   │
├───────────────────────────────────────────────────────────┤
│  📚 Due for Revision (8 questions)                       │
│  🔴 Binary Tree Max Path Sum (Advanced)                  │
│  🟡 Valid Parentheses (Basic)                            │
│  [View All →]                                            │
└───────────────────────────────────────────────────────────┘
```

### **2. Topic Learning Page**
```
┌──────────────────────────────────────────────────────────┐
│  📚 Arrays & Strings > Two Pointer Technique             │
└──────────────────────────────────────────────────────────┘

[Theory] [Practice Questions] [Notes]

┌───────────────────────────────────────────────────────────┐
│  📖 Concept Explanation                                   │
│  ────────────────────                                     │
│  The two-pointer technique is an efficient way to...     │
│  [Interactive Diagram]                                    │
│                                                           │
│  Time Complexity: O(n)                                    │
│  Space Complexity: O(1)                                   │
│                                                           │
│  When to Use:                                             │
│  • Searching pairs in sorted array                        │
│  • Removing duplicates in-place                           │
│  • Checking palindromes                                   │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  💪 Practice Questions                                    │
│  ────────────────────                                     │
│  Basic (5 questions)                                      │
│  ✅ Two Sum II (Solved)                                   │
│  ✅ Valid Palindrome (Solved)                             │
│  ⭕ Remove Duplicates (Not Attempted)                     │
│  ...                                                      │
│                                                           │
│  Intermediate (8 questions)                               │
│  ✅ Container With Most Water (Solved)                    │
│  ❌ 3Sum (Attempted - Wrong)                              │
│  ⭕ Trapping Rain Water (Not Attempted)                   │
│  ...                                                      │
│                                                           │
│  Advanced (5 questions)                                   │
│  ⭕ Minimum Window Substring (Not Attempted)              │
│  ...                                                      │
└───────────────────────────────────────────────────────────┘
```

### **3. Question Practice Page**
```
┌──────────────────────────────────────────────────────────┐
│  Container With Most Water                    [⭐ Bookmark]│
│  Intermediate • Arrays • Two Pointer                      │
└──────────────────────────────────────────────────────────┘

[Description] [Solutions] [Submissions] [Discuss]

┌───────────────────────────────────────────────────────────┐
│  Problem Statement                                        │
│  ─────────────────                                        │
│  You are given an integer array height of length n...    │
│                                                           │
│  Constraints:                                             │
│  • n == height.length                                     │
│  • 2 <= n <= 10^5                                         │
│  • 0 <= height[i] <= 10^4                                 │
│                                                           │
│  Example 1:                                               │
│  Input: height = [1,8,6,2,5,4,8,3,7]                     │
│  Output: 49                                               │
│  Explanation: The lines at indices 1 and 8...            │
└───────────────────────────────────────────────────────────┘

┌─────────────────────┬─────────────────────────────────────┐
│  Code Editor        │  Test Cases                         │
│  ────────────       │  ──────────                         │
│  [Python ▼]         │  [Run Code] [Submit]                │
│                     │                                     │
│  def maxArea(self,  │  Test Case 1: ✅ Passed             │
│    height):         │  Input: [1,8,6,2,5,4,8,3,7]        │
│    # Write code here│  Output: 49                         │
│                     │  Expected: 49                       │
│                     │  Time: 45ms                         │
│                     │                                     │
│                     │  Test Case 2: ✅ Passed             │
│  [Show Hints]       │  ...                                │
│  [💡 Hint Available]│                                     │
│                     │  [Show Hidden Test Cases]           │
└─────────────────────┴─────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  📝 Your Notes                                            │
│  ────────────                                             │
│  [Add personal notes here...]                             │
│                                                           │
│  ⭐ Mark for Revision  |  😊 😐 😟 Difficulty Rating      │
└───────────────────────────────────────────────────────────┘
```

### **4. Analytics Dashboard**
```
┌──────────────────────────────────────────────────────────┐
│  📊 Your Progress Analytics                               │
└──────────────────────────────────────────────────────────┘

[Overview] [Topics] [Performance] [Streaks]

┌─────────────────────┬─────────────────────────────────────┐
│  Overall Progress   │   30-Day Activity Heatmap           │
│  ─────────────────  │   ─────────────────────             │
│  Total: 247/500     │   [Contribution-style heatmap]      │
│  ████████░░ 49.4%   │   Less ░░▓▓██ More                  │
│                     │                                     │
│  By Difficulty:     │   Peak Day: May 15 (8 questions)   │
│  Basic: 80%         │   Average: 3.2 questions/day        │
│  Intermediate: 48%  │                                     │
│  Advanced: 21%      │                                     │
└─────────────────────┴─────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  📈 Topic Mastery                                         │
│  ─────────────────                                        │
│  [Bar chart showing completion % per topic]               │
│                                                           │
│  Arrays & Strings    ████████████████░░ 85%              │
│  Linked Lists        ████████████░░░░░░ 70%              │
│  Trees               ████████░░░░░░░░░░ 45%              │
│  Dynamic Programming ██████░░░░░░░░░░░░ 30%              │
│  Graphs              ████░░░░░░░░░░░░░░ 20%              │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  🏆 Achievements & Streaks                                │
│  ──────────────────────────                               │
│  Current Streak: 🔥 12 days                              │
│  Longest Streak: 🏆 28 days                              │
│  Total Active Days: 89/120 days                           │
│                                                           │
│  Badges Earned:                                           │
│  🥇 First 10 Questions  🥈 Week Warrior  🥉 Topic Master │
└───────────────────────────────────────────────────────────┘
```

### **5. Import Questions Page**
```
┌──────────────────────────────────────────────────────────┐
│  ➕ Add Custom Questions                                  │
└──────────────────────────────────────────────────────────┘

[Manual Entry] [CSV Import] [JSON Import] [URL Import]

┌───────────────────────────────────────────────────────────┐
│  📝 Manual Question Entry                                 │
│  ────────────────────────                                 │
│  Title: ________________________________                  │
│  Topic: [Arrays ▼]  Difficulty: [Basic ▼]                │
│  Tags: [+Add Tag]                                         │
│                                                           │
│  Description:                                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ [Rich text editor]                                  │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Constraints: _____________________________________       │
│                                                           │
│  Test Cases:                                              │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Input: ________________  Output: ________________   │ │
│  │ [+Add Test Case]                                    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Solution Code:                                           │
│  [Code editor with syntax highlighting]                   │
│                                                           │
│  [Preview] [Save to Database]                             │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  📄 Bulk Import (CSV/JSON)                                │
│  ─────────────────────────                                │
│  [📎 Drag & Drop or Click to Upload]                     │
│                                                           │
│  Supported formats: .csv, .json                           │
│  [Download Template] [View Import Guide]                  │
│                                                           │
│  Import History:                                          │
│  • May 20: LeetCode Contest 123 (15 questions)            │
│  • May 18: Interview Questions (8 questions)              │
└───────────────────────────────────────────────────────────┘
```

---

## API Endpoints

### **Authentication**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/profile
```

### **Topics**
```
GET    /api/topics                    # List all topics
GET    /api/topics/:id                # Get topic details
GET    /api/topics/:id/questions      # Get questions for topic
GET    /api/topics/progress           # User progress per topic
```

### **Questions**
```
GET    /api/questions                 # List questions (with filters)
GET    /api/questions/:id             # Get question details
POST   /api/questions                 # Create custom question
PUT    /api/questions/:id             # Update question
DELETE /api/questions/:id             # Delete custom question
GET    /api/questions/:id/solutions   # Get all solutions
POST   /api/questions/:id/solutions   # Submit a solution
```

### **Practice & Submissions**
```
POST   /api/submit                    # Submit code for evaluation
GET    /api/submissions               # Get user submissions
GET    /api/submissions/:id           # Get submission details
POST   /api/questions/:id/attempt     # Log an attempt
GET    /api/questions/:id/hints       # Get progressive hints
```

### **Progress & Tracking**
```
GET    /api/progress                  # Overall user progress
GET    /api/progress/daily            # Daily activity
POST   /api/progress/daily            # Log daily activity
GET    /api/progress/streak           # Streak information
GET    /api/progress/analytics        # Detailed analytics
```

### **Revision**
```
GET    /api/revision/queue            # Get revision queue
POST   /api/revision/add              # Add question to revision
PUT    /api/revision/:id/complete     # Mark revision complete
GET    /api/revision/due              # Questions due today
```

### **Custom Questions**
```
POST   /api/import/manual             # Manual question entry
POST   /api/import/csv                # CSV bulk import
POST   /api/import/json               # JSON import
POST   /api/import/url                # URL scraping import
GET    /api/import/history            # Import history
```

### **Notes & Bookmarks**
```
GET    /api/notes/:questionId         # Get notes for question
POST   /api/notes                     # Create note
PUT    /api/notes/:id                 # Update note
DELETE /api/notes/:id                 # Delete note
POST   /api/bookmarks/:questionId     # Toggle bookmark
GET    /api/bookmarks                 # Get all bookmarks
```

### **Chatbot**
```
POST   /api/chat/query                # Ask chatbot
POST   /api/chat/hint                 # Get hint for question
POST   /api/chat/review               # Code review request
GET    /api/chat/history              # Chat history
```

---

## Technical Stack

### **Frontend**
- **Framework**: React 18+ with TypeScript
- **UI Library**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand or Redux Toolkit
- **Code Editor**: Monaco Editor (VS Code editor)
- **Charts**: Recharts or Chart.js
- **Markdown**: react-markdown with syntax highlighting
- **Rich Text Editor**: TipTap or Slate

### **Backend**
- **Runtime**: Node.js 20+ with Express.js
- **Language**: TypeScript
- **ORM**: Prisma or TypeORM
- **API Documentation**: Swagger/OpenAPI
- **Code Execution**: Docker containers for sandboxed execution
- **Real-time**: Socket.io for live updates

### **Database**
- **Primary DB**: PostgreSQL 15+ (relational data)
- **Cache**: Redis (session, leaderboard, hot data)
- **Search**: Elasticsearch (optional for advanced search)
- **File Storage**: AWS S3 or Google Cloud Storage

### **AI/ML Services**
- **Chatbot**: OpenAI GPT-4 or Claude API
- **Question Classification**: Custom ML model or GPT-4
- **Code Analysis**: Static analysis tools + AI

### **DevOps**
- **Containerization**: Docker
- **Orchestration**: Kubernetes (optional for scale)
- **CI/CD**: GitHub Actions or GitLab CI
- **Monitoring**: Grafana + Prometheus
- **Logging**: ELK Stack or Loki

### **Testing**
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **API Tests**: Supertest
- **Load Tests**: k6 or Artillery

---

## Implementation Roadmap

### **Phase 1: Foundation (Weeks 1-4)**
**Week 1-2: Project Setup & Core Infrastructure**
- [ ] Initialize frontend (React + TypeScript + Tailwind)
- [ ] Initialize backend (Express + TypeScript + Prisma)
- [ ] Set up PostgreSQL database with initial schema
- [ ] Configure Redis for caching
- [ ] Implement authentication system (JWT)
- [ ] Create basic user registration/login

**Week 3-4: Core Database & API**
- [ ] Implement all database tables and relationships
- [ ] Create database seed scripts with sample questions
- [ ] Build REST API for topics, questions, solutions
- [ ] Add input validation and error handling
- [ ] Set up API documentation with Swagger

### **Phase 2: Learning Hub (Weeks 5-8)**
**Week 5-6: Topic & Question System**
- [ ] Build topic browsing interface
- [ ] Create topic detail pages with theory
- [ ] Implement question listing with filters
- [ ] Build question detail page
- [ ] Add code editor integration (Monaco)

**Week 7-8: Practice & Submission**
- [ ] Implement code execution sandbox
- [ ] Build test case runner
- [ ] Create submission evaluation logic
- [ ] Add solution viewing interface
- [ ] Implement hint system

### **Phase 3: Progress Tracking (Weeks 9-12)**
**Week 9-10: User Progress & Analytics**
- [ ] Implement user progress tracking
- [ ] Build daily activity logging
- [ ] Create analytics dashboard
- [ ] Add charts and visualizations
- [ ] Implement streak tracking

**Week 11-12: Daily Tracker**
- [ ] Build daily summary cards
- [ ] Create calendar view
- [ ] Implement goal setting interface
- [ ] Add achievement badges
- [ ] Build performance metrics

### **Phase 4: Advanced Features (Weeks 13-16)**
**Week 13-14: Revision System**
- [ ] Implement spaced repetition algorithm
- [ ] Build revision queue
- [ ] Create revision dashboard
- [ ] Add priority calculation
- [ ] Implement due date notifications

**Week 15-16: Custom Questions**
- [ ] Build manual question entry form
- [ ] Implement CSV import
- [ ] Add JSON import
- [ ] Create URL scraping for LeetCode/HackerRank
- [ ] Build import history tracking

### **Phase 5: AI Integration (Weeks 17-20)**
**Week 17-18: Chatbot Development**
- [ ] Integrate OpenAI/Claude API
- [ ] Build chatbot interface
- [ ] Implement context management
- [ ] Add code review features
- [ ] Create hint generation system

**Week 19-20: AI Enhancements**
- [ ] Implement auto-classification for imported questions
- [ ] Add intelligent difficulty suggestions
- [ ] Build personalized learning path recommendations
- [ ] Create adaptive hint system

### **Phase 6: Polish & Launch (Weeks 21-24)**
**Week 21-22: UI/UX Refinement**
- [ ] Improve responsive design
- [ ] Add animations and transitions
- [ ] Optimize performance
- [ ] Conduct user testing
- [ ] Fix bugs and issues

**Week 23-24: Testing & Deployment**
- [ ] Write comprehensive tests (unit, integration, E2E)
- [ ] Set up CI/CD pipeline
- [ ] Configure production environment
- [ ] Deploy to cloud (AWS/GCP/Azure)
- [ ] Monitor and optimize

---

## Success Metrics

### **User Engagement**
- Daily Active Users (DAU)
- Average session duration
- Questions attempted per user
- Streak maintenance rate

### **Learning Outcomes**
- Questions solved over time
- Topic completion rate
- Difficulty progression
- Revision adherence rate

### **System Performance**
- API response time < 200ms
- Code execution time < 5s
- Database query time < 100ms
- 99.9% uptime

### **User Satisfaction**
- Net Promoter Score (NPS)
- User retention rate
- Feature adoption rate
- Feedback ratings

---

## Future Enhancements

### **V2 Features**
- **Live Coding Sessions**: Real-time collaborative coding
- **Mock Interviews**: AI-powered interview simulator
- **Discussion Forums**: Community Q&A
- **Video Solutions**: Video explanations for complex problems
- **Leaderboards**: Global and friend rankings
- **Code Comparison**: Compare solutions with optimal code
- **Mobile App**: iOS and Android native apps

### **V3 Features**
- **Company-Specific Prep**: Curated question sets per company
- **Contest Mode**: Timed contests with leaderboards
- **Peer Review**: Community code review system
- **Study Groups**: Collaborative learning groups
- **Certificate Programs**: Completion certificates
- **Premium Tier**: Advanced features and exclusive content

---

## Conclusion

DSA Studio is designed to be a comprehensive, intelligent, and user-centric platform for mastering Data Structures and Algorithms. With structured learning paths, multi-level practice questions, external question integration, persistent storage, and comprehensive tracking, users will have everything they need to progress from beginner to advanced levels.

The platform's AI-powered features, spaced repetition system, and detailed analytics ensure optimal learning outcomes and long-term retention. The modular architecture allows for continuous improvement and feature additions based on user feedback.

**Next Steps:**
1. Review and approve this specification
2. Set up development environment
3. Begin Phase 1 implementation
4. Iterate based on user feedback

---

**Document Version**: 1.0  
**Last Updated**: May 22, 2026  
**Author**: DSA Studio Team  
**Status**: Ready for Implementation
