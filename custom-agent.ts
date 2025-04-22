
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";


// Define the tools for the agent to use
const tools = [new TavilySearchResults({ maxResults: 3 })];
const toolNode = new ToolNode(tools);

// Create a model and give it access to the tools
const model = new ChatOpenAI({
    model: 'gpt-4o-mini',
    temperature: 0
}).bindTools(tools);

// Define a function that calls the model

async function callModel({messages}: typeof MessagesAnnotation.State) {
    const res = await model.invoke(messages);
    // we return a list, because this will get added to the existing list
    return { messages: [res] };
}

function shouldContinue({messages }: typeof MessagesAnnotation.State){
    const lastMessage = messages[messages.length -1] as AIMessage;
    if (lastMessage.tool_calls?.length) {
        return "tools";
    }
    // Otherwise, we stop (reply to the user) using the special "__end__" node
    return "__end__";
}

const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent', callModel)
    .addEdge('__start__', 'agent')
    .addNode('tools', toolNode)
    .addEdge('tools', 'agent')
    .addConditionalEdges('agent', shouldContinue);

// Finally, we compile it into a LangChain Runnable
const app = workflow.compile();

// use the agent

const finalState = await app.invoke({
    messages: [new HumanMessage("what is the weather in sf")]
});

console.log(finalState.messages[finalState.messages.length -1].content);


const nextState = await app.invoke({
    // including the messages from the previous run gives the LLM context
    // This way it knows we're asking about the weather in NY
    messages: [...finalState.messages, new HumanMessage("What about NY")]
});

console.log(nextState.messages[nextState.messages.length -1].content);






