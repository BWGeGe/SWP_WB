import { PrismaClient } from "./prisma/generated/client.ts";
const prisma = new PrismaClient();
async function main() {
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    async function main() {
        // Seed difficulties
        await prisma.difficulty.createMany({
            data: [
                { level: "Easy" },
                { level: "Medium" },
                { level: "Hard" },
            ],
        });

        // Seed types
        await prisma.type.createMany({
            data: [
                { name: "Multiple Choice" },
                { name: "True / False" },
            ],
        });

        // Seed categories
        await prisma.category.createMany({
            data: [
                { name: "General Knowledge", opentdb_id: 9 },
                { name: "Entertainment: Books", opentdb_id: 10 },
                { name: "Entertainment: Film", opentdb_id: 11 },
                { name: "Entertainment: Music", opentdb_id: 12 },
                { name: "Entertainment: Musicals & Theatres", opentdb_id: 13 },
                { name: "Entertainment: Television", opentdb_id: 14 },
                { name: "Entertainment: Video Games", opentdb_id: 15 },
                { name: "Entertainment: Board Games", opentdb_id: 16 },
                { name: "Science & Nature", opentdb_id: 17 },
                { name: "Science: Computers", opentdb_id: 18 },
                { name: "Science: Mathematics", opentdb_id: 19 },
                { name: "Mythology", opentdb_id: 20 },
                { name: "Sports", opentdb_id: 21 },
                { name: "Geography", opentdb_id: 22 },
                { name: "History", opentdb_id: 23 },
                { name: "Politics", opentdb_id: 24 },
                { name: "Art", opentdb_id: 25 },
                { name: "Celebrities", opentdb_id: 26 },
                { name: "Animals", opentdb_id: 27 },
                { name: "Vehicles", opentdb_id: 28 },
                { name: "Entertainment: Comics", opentdb_id: 29 },
                { name: "Science: Gadgets", opentdb_id: 30 },
                { name: "Entertainment: Japanese Anime & Manga", opentdb_id: 31 },
                { name: "Entertainment: Cartoon & Animations", opentdb_id: 32 },
            ],
        });

        // Fetch and seed questions for each category
        const categories = await prisma.category.findMany();
        for (const category of categories) {
            const tokenGiven = await http(
                "https://opentdb.com/api_token.php?command=request",
            );
            const tokenToUse = tokenGiven.token;

            const countData = await http(
                `https://opentdb.com/api_count.php?category=${category.opentdb_id}`,
            );
            let questionsLeft =
                countData.category_question_count.total_question_count;

            while (questionsLeft > 0) {
                const maxQuestions = Math.min(questionsLeft, 50); // Limit to 50 questions per batch
                questionsLeft -= maxQuestions;
                const apiUrl =
                    `https://opentdb.com/api.php?amount=${maxQuestions}&token=${tokenToUse}&category=${category.opentdb_id}`;

                console.log(`Fetching questions for category: ${category.name}`);
                const questionsData = await http(apiUrl);

                for (const question of questionsData.results) {
                    // Create the correct answer in the database
                    const correctAnswer = await prisma.answer.create({
                        data: {
                            answer: question.correct_answer,
                        },
                    });

                    // Create the incorrect answers in the database
                    const incorrectAnswers = await Promise.all(
                        question.incorrect_answers.map(async (incorrect) => {
                            return await prisma.answer.create({
                                data: {
                                    answer: incorrect,
                                },
                            });
                        }),
                    );

                    // Create the question and connect it with the answers
                    await prisma.question.create({
                        data: {
                            question: question.question,
                            difficulty: { connect: { level: question.difficulty } },
                            type: { connect: { name: question.type } },
                            category: { connect: { id: category.id } },
                            correct_answer: {
                                connect: { id: correctAnswer.id },
                            },
                            incorrect_answers: {
                                connect: incorrectAnswers.map((ans) => ({ id: ans.id })),
                            },
                        },
                    });
                    await delay(5000); // Wait 5 seconds before the next API call
                }

                console.log(
                    `Seeded ${questionsData.results.length} questions for ${category.name}`,
                );
            }

            console.log("Seeding completed!");
        }

        main()
            .catch((e) => {
                console.error(e);
                process.exit(1);
            })
            .finally(async () => {
                await prisma.$disconnect();
            });
    }

    console.log("Seed data inserted");
}
main();

export async function http(
    request: RequestInfo,
): Promise<any> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
}
