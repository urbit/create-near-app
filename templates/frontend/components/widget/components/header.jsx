const Navbar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  background-color: #000000;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75vw;
  margin: auto;
  align-items: center;
  padding: 10px;
`

const Button = styled.button`
  width: auto;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #000000;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
  cursor: pointer;
  border-radius: 5px;
`

return (
  <Navbar>
    <Container>
      <img
        style={{ width: '60px', objectFit: 'contain' }}
        src="https://storage.googleapis.com/media.urbit.org/logo/White/~-logo-white-medium.png"
      />
      <Button>Documentation</Button>
    </Container>
  </Navbar>
)
