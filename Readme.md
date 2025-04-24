# LangGraph
 -  `LangGraph` is a low-level orchestration framework for building controllable agents. 
 -  While `langchain` provides integrations and composable components to streamline LLM application development, the langGraph library enables agent orchestration -- offering customizable architectures, long-term memory, and human-in-loop to reliably handle complex tasks.
 

# LangGraph Development
   - Langgraph development involves defining `AI agents` as directed graphs with nodes and edges, allowing for complex, stateful agent architecture.
   - Nodes represent distinct actions or states in the agent's workflow, while
   - Edges define the flow of execution and data between nodes.

   This approach enables developers to build robust, customizable, and scalable AI systems.

# Key Concepts
   ### Directed Graphs
   - LangGraph uses graphs to structure agent behavior. Nodes represent individual steps or states, and edges determine the sequence of execution

   ### Nodes
   - These are the building blocks of the agent graph, representing actions, LLM calls, tool interactions, or other operations. 

   ### Edges
   - Edges connect nodes and define the flow of control, including conditional logic, data passing, and state transitions.

   ### stateful agent
   - a stateful agent refers to an agent that manintains and utilizes a shared state across its execution, allowing it to remember previous interactions and make decisions based on that context.

# Why use LangGraph ?
  - LangGraph is built for developers who want to build powerful, adaptable AI agents.
  - Developer choose LangGraph for:

    ## Reliability and controllability
    - steer agent actions with moderation checks and human-in-the-loop approvals.
    - LandGraph persists context for long running workflows, keeping your agents on course

    ## Low-level and extensible
    - Build custom agents with fully descriptive, low-level primitives free from rigid abstractions that limit customization.
    - Design scalable multi-agent systems, with each agent serving a specific role tailored to your use case.

    ## First-class streaming support
     - With token-by-oken streaming and streaming of intermediate steps, LangGraph gives users clear visibility into agents reasoning and actions as they unfold in real time.


# LangGraph Ecosystem
 - while langGraph can be used standalone, it also integrates seamlessly with given to developers a full suite of tools for building agents. To improve your LLM application development, pain LangGraph with
 - ## LangSmith 
    - Helpful for agent evals and observability. Debug poor-performing LLM app runs, evaluate agent trajectories, gain visibility in production, and improve performance over time.

#### createReactAgent
 - createReactAgent can be greatful for simple agents, but sometimes you need something more powerful.

### Development Process:
   - ##### Define the Graph:
      Developers start by defining the structure of the agent as a graph, specifying nodes and edges. 
   - ##### Node Implementation:
      Each node is implemented with specific logic, often involving LLM calls, tool integrations, or state updates. 
   - ##### Edge Logic:
      Edges are defined to control the flow of execution between nodes, including conditional logic and data passing. 
   - ##### State Management:
      LangGraph allows for state management, enabling agents to remember past interactions and maintain context. 
