
export default function Display({content}) {

    return (
        <div dangerouslySetInnerHTML={{__html:content}}>
        </div>
    )
}