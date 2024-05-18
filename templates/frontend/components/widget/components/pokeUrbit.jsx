let { ship, url, code } = props

const Label = styled.span`
  font-size: 16px;
`

const Form = styled.div`
  max-width: 300px;
  margin: auto;
  text-align: center;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #bbc0c1;
  border-radius: 10px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  box-sizing: border-box;
  overflow: hidden;
`

const Button = styled.button`
  width: auto;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #bbc0c1;
  color: black;
  cursor: pointer;
  border-radius: 5px;
`

Urbit.ship(ship)
Urbit.setTestApi(url, code)

const [pokeApp, setPokeApp] = useState('')
const [pokeMark, setPokeMark] = useState('')
const [pokeJson, setPokeJson] = useState('')
const [pokeStatus, setPokeStatus] = useState('')

const handlePokeButton = () => {
  Urbit.pokeUrbit(
    pokeApp,
    pokeMark,
    pokeJson,
    () => {
      setPokeStatus(`Poke to ${pokeApp} succeeded!`)
      setPokeApp('')
      setPokeMark('')
      setPokeJson('')
    },
    () => {
      setPokeStatus(`Poke to ${pokeApp} failed`)
    })
}

return (
    <Section>
      <Form>
        <Label>{`Poke ~${ship}`}</Label>
        <br/>
        <Label>App</Label>
        <Input
          type="text"
          value={pokeApp}
          onChange={(e) => setPokeApp(e.target.value)}
          name="pokeApp"
          placeholder="hood"
        />
        <Label>Mark</Label>
        <Input
          type="text"
          value={pokeMark}
          onChange={(e) => setPokeMark(e.target.value)}
          name="pokeMark"
          placeholder="helm-hi"
        />
        <Label>JSON</Label>
        <Input
          type="text"
          value={pokeJson}
          onChange={(e) => setPokeJson(e.target.value)}
          name="pokeJson"
          placeholder={`hi ~${ship}`}
        />
        <Button onClick={handlePokeButton}>Send Poke</Button>
      </Form>
      <p>{pokeStatus}</p>
    </Section>
)
