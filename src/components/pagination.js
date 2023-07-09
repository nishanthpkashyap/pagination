import axios from "axios"
import { useEffect, useState } from "react";
import "./pagination.css";
import Title from "antd/es/typography/Title";

export function Pagination(){
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(0)

    const paginate = (newPage)=>{
        if(newPage !== page && newPage <= limit && newPage >= 1){
            setPage(newPage);
        }
    }

    const getData = async ()=>{
        const {data} = await axios.get("https://dummyjson.com/products?limit=100")
        const {products, limit} = data;
        if(products.length){
            setProducts(products);
            setLimit(Math.ceil(limit / 10));
        }
            
    }

    useEffect(()=>{
        getData();
    },[]);

    return (
        <div>
            <Title level={1}>Pagination</Title>
           <div className="products">
           {
            products.slice(page*10-10, page*10).map((product, index)=>{
                return (<div className="product" key={index}>
                    <img src={product.thumbnail} alt={product.title}/>
                    <span>{product.title}</span>
                </div>)
            })
           }
           </div>
           <div className="pageList">
                <span onClick={()=>paginate(page-1)}>⬅️</span>
                {[...Array(limit)].map((_, index)=>{
                        return <span className={page === index + 1 ? "current__page" : null} onClick={()=>{paginate(index+1)}} key={index}>{index + 1}</span>
                })}
                <span onClick={()=>paginate(page+1)}>➡️</span>
            </div>
        </div>
    )
}