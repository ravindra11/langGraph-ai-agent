import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
// langchain/langgraph contains the building blocks used to assemble an agent
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";


// please export OPENAI_API_KEY and TAVILY_API_KEY
async function Agent(){

// defining the tools for the agent to use
const agentTools = [new TavilySearchResults({ maxResults: 3 })];
const agentModel = new ChatOpenAI({ temperature: 0 });

// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();

// creates a stateGraph agent that relies on a chat model utilizing tool calling.
const agent = createReactAgent({
    llm: agentModel,
    tools: agentTools,
    checkpointSaver: agentCheckpointer
});

// Now it's time to use
// Create a new instance with a specific thread ID
const agentFinalState = await agent.invoke(
    { messages: [new HumanMessage("what is the current weather in sf")] },
    { configurable: { thread_id: '42' } }
);

console.log("temperature in sf is --- ", agentFinalState.messages[agentFinalState.messages.length - 1].content);

const agentNextState = await agent.invoke(
    { messages: [new HumanMessage("What about ny")] },
    { configurable: { thread_id: "42" } }
);

console.log("NY temperature", agentNextState.messages[agentNextState.messages.length - 1].content);

}

Agent();