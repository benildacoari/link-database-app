import { GraphQLServer } from 'graphql-yoga';
import Category from "./models/Category.js";
import Link from "./models/Link.js";
import { conection } from "./dbConection.js";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv"
dotenv.config()

conection();

//resolvers
const resolvers = {
    Query: {
        links: async () => await Link.find({}),
        categorys: async () => await Category.find({})
    },
    Link: {
        category: async (parent) => await Category.findOne({_id: parent.category})
    },
    Mutation: {
        createLink: async (_, {link}) => {
            const newLink = new Link(link)
            await newLink.save()
            return newLink;
        },
        deleteLink: async (_, {linkId}) => {
            const linkDeleted = await Link.findByIdAndDelete(linkId)
            return linkDeleted;
        },
        updateLink: async (_, {linkId, link}) => {
            return Link.findOneAndUpdate({_id: linkId}, link)
        },
        createCategory: async (_, {category}) => {
            const newCategory = new Category(category)
            await newCategory.save()
            return newCategory
        },
        deleteCategory: async (_, {categoryId}) => {
            const categoryDeleted = await Category.findByIdAndDelete(categoryId)
            return categoryDeleted
        },
        updateCategory: async (_, {categoryId, title}) => {
            return Category.findOneAndUpdate({_id: categoryId}, {title: title})
        }
    }
}

// obtener dirname sin babel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// creacion del servidor
const server = new GraphQLServer({
    typeDefs: path.join(__dirname, "graphql/schema.graphql"),
    resolvers
})

// ejecucion del servidor
server.start({port: 4000}, ({port}) => {
    console.log(`Server running at ${port}`)
})
