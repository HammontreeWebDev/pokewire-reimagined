export default async function updateFavoritePokemon(pokemonName) {

    const userData = {
        userData: {
            favoritePokemon: pokemonName
        }
    };

    try {
        const response = await fetch('/api/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update user: ${errorData.error || 'Unknown Error'}`);
        }

        const updatedUser = await response.json();
        console.log("Updated user details:", updatedUser);

    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({
            error: "Failed to update user"
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}