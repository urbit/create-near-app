const Container = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
`;
const Wrapper = styled.div`
  background-color: #f5f5f5;;
  margin-left: auto;
  margin-right: 20px;
  padding: 5px;
  border: 1px solid #bbc0c1;
  border-radius: 10px;
`;
const Link = styled.a`
text-decoration: none;
color: black;
cursor: pointer;
`;

return (
  <Container>
    <Wrapper>
      <Link href="url">Documentation</Link>
    </Wrapper>
  </Container>
);