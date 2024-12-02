from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field


class SwapRouter(BaseModel):
    sourcechain: str = Field(
        ...,
        description="Source chain name, choose the most similar and return one (Avalanche Fuji, Polygon Mumbai, Ethereum Goerli)"
    )
    destinationchain: str = Field(
        ...,
        description="Destination chain name, choose the most similar and return one (Avalanche Fuji, Polygon Mumbai, Ethereum Goerli)"
    )
    sourcetoken: str = Field(
        ...,
        description="From which token that name, remember to follow the format and instructions e.g., USDT, ETH"
    )
    destinationtoken: str = Field(
        "ETH",
        description="Return ETH by default if no inputs or you don't understand anything else, the token to which swapping happens, give that code e.g., ETH, USDT"
    )
    amount: float = Field(
        ...,
        description="Amount e.g., 100 or 1000"
    )

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

parser = JsonOutputParser(pydantic_object=SwapRouter)


prompt = PromptTemplate(
    template="Follow the below instruction to perform the following {query}.\n{format_instructions}\n",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

chain = prompt | llm | parser

response = chain.invoke(
    {
        "query" :"Swap 100 USDT from Avalanche Fuji to ETH on Polygon Mumbai."
    }
)

print(f'{response=}')