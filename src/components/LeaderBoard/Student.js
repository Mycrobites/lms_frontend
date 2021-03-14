const Student = (props) => {
  const { rank, name, image, bestScore, points } = props;

  return (
    <tr className="Student">
      <td>{rank}</td>
      <td className="name">
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </td>
      <td>{bestScore}</td>
      <td>{points}</td>
    </tr>
  );
};

export default Student;
