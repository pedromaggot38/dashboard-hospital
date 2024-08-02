import { auth } from "../../../../auth";

const Teste = async () => {
    const session = await auth();

    return(
        <div>
            <h1>Teste</h1>
            <p>{JSON.stringify(session)}</p>
        </div>
    )

}

export default Teste