import { getToken, jwt } from "next-auth/jwt";

const secret = process.env.SECRET;

async function updateSelectedPokemon(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method not allowed
    }

    const token = await getToken({ req, secret });
    if (!token) {
        return res.status(401).json({error: 'No token found'});
    }

    const {selectedPokemon} = req.body;
    if (!selectedPokemon) {
        return res.status(400).json({ error: 'No Pokemon Selected' });
    }

    const updatedToken = await jwt({
        token,
        secret,
        maxAge: 30 * 24 * 60 * 60,
        callback: async (token) => {
            token.selectedPokemon = selectedPokemon;
            return token;
        }
    });

    res.status(200).json({success: true, selectedPokemon: updatedToken.selectedPokemon});
}

export default updateSelectedPokemon;