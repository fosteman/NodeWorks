const {GraphQLInt, GraphQLList, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInterfaceType, GraphQLUnionType, GraphQLEnumType} = require('graphql');

const roll = () => Math.floor(6 * Math.random()) + 1;
const IPersonType = new GraphQLInterfaceType({
    fields: {
        name: {type: GraphQLString}
    },
    name: 'Person'
}); //ionterface is a guarantee that I can ask for specific fields
/*const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: {
        name: { type: GraphQLString},
        depoName: { type: GraphQLString}
    },
    interfaces: [IPersonType] //this object implements these interfaces

});*/
const VendorType = new GraphQLObjectType({
    name: 'Vendor',
    fields: {
        name: {type: GraphQLString},
        companyName: {type: GraphQLString}
    },
    interfaces: [IPersonType]
});
const ContactType = new GraphQLObjectType({
    name: 'Contact',
    fields: {
        person: IPersonType,
        phoneNumber: { type: GraphQLString},
        emailAddress: {type: GraphQLString}
    }
});
const EducationType = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
        schoolName: {type: GraphQLString},
        fieldOfStudy: {type: GraphQLString},
        graduationYear: {type: GraphQLInt}
    })
});
const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        companyName: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    }),
});
const ResumeSectionType = new GraphQLUnionType({
    name: 'ResumeSection',
    types: [ExperienceType, EducationType],
    resolveType(value) {
        if (value instanceof Experience) {
            return ExperienceType;
        }
        if (value instanceof Education) {
            return EducationType;
        }
    }
});
const ContractType = new GraphQLEnumType({
    name: 'Contract',
    values: {
        FULLTIME: {value: 1},
        PARTTIME: {value: 2},
        SHIFTWORK: {value: 3}
    }
});
const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: {
        name: {type: GraphQLString},
        contractType: ContractType
    }
});
const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    fields: {
        name: {type: GraphQLString},
        contractTypes: new GraphQLList(ContractType),
    }
});
const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        diceRoll: {
            type: new GraphQLList(GraphQLInt),
            description: '***Simulate** a dice roll determined by count',
            args: {
                count: {
                    type: GraphQLInt,
                    defaultValue: 2
                }
            },
            resolve: (_, args) => {
                let rolls = [];
                for (let i = 0; i < args.count; i++) {
                    rolls.push(roll());
                }
                return rolls;
            }
        },
        imgURL: {
            type: GraphQLString,
            resolve: () => 'http://imgUrl...'
        },
        usersCount: {
            description: 'Total number of users in the database',
            type: GraphQLInt,
            resolve: (_, args, { db }) =>
                db.collection('users').count()
        }
    }
});
const mySchema = new GraphQLSchema({
    query: queryType
});
module.exports = mySchema;
