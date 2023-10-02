import Spinner from "./Spinner";
import {useQuery} from "react-query";
import {request} from "axios";

const pizzaRequest = () => request({ url: "/pizza" });
const Posts = () => {
    const { isLoading, isError, data: res } = useQuery("get-pizzas", pizzaRequest);

    if (isLoading) {
        return <Spinner />;
    }
    
    if (isError) {
        return <div>Error fetching data</div>;
    }
    
    return (
        <>
            <h2>Pizzas</h2>
            {res &&
                res.data &&
                res.data.map((item) => {
                    return (
                        <div key={item.id} id={item.id}>
                            {item.title}
                        </div>
                    );
                })}
        </>
    );
};
export default Posts;