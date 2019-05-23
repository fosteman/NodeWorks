let q = `I studied the lives of great men and famous women, and I found that the men and women who got to the top were those who did the jobs they had in hand, with everything they had of energy and enthusiasm.
—HARRY S TRUMAN
N
Plough deep while sluggards sleep. —BENJAMIN FRANKLIN
N
Everything comes to him who hustles while he waits. —THOMAS EDISON
N
Look at a day when you are supremely satisfied at the end. It’s not a day when you lounge around doing nothing; it’s when you’ve had everything to do, and you’ve done it.
—MARGARET THATCHER
N
Always bear in mind that your own resolution to succeed is more important than any other one thing.
—ABRAHAM LINCOLN
N
Heights by great men reached and kept were not obtained by sudden flight but, while their companions slept, they were toiling upward in the night. —HENRY WADSWORTH LONGFELLOW
N
The highest reward for person’s toil is not what they get for it, but what they become by it.
—JOHN RUSKIN
N
Think “impossible” and dreams get discarded, projects get abandoned, and hope for wellness is torpedoed. But let someone yell the words “It’s possible,” and resources we hadn’t been aware of come rushing in to assist us in our quest.
—GREG ANDERSON
N
When our memories outweigh our dreams, we have grown old. —WILLIAM J. (BILL) CLINTON
N
Sometimes dreams alter the course of an entire life. —JUDITH DUERK
N
Don’t be afraid of the space between your dreams and reality. If you can dream it, you can make it so.
—BELVA DAVIS
N
If one advances in the direction of his dreams, one will meet with success unexpected in common hours.
—HENRY DAVID THOREAU
N
To accomplish great things, we must dream as well as act. —ANATOLE FRANCE
Cherish your vision and your dreams as they are the children of your soul, the blueprints of your ultimate achievements.
—NAPOLEON HILL
N
All people dream, but not equally. Those who dream by night in the dusty recesses of their mind, wake in the morning to find that it was vanity. But the dreamers of the day are dangerous people, for they dream their dreams with open eyes, and make them come true.
—T. E. LAWRENCE (LAWRENCE OF ARABIA)
N
Dreaming permits each and every one of us to be quietly and safely insane every night of our lives.
—WILLIAM DEMENT
N
Your hopes, dreams and aspirations are legitimate. They are trying to take you airborne, above the clouds—above the storms—if you only let them. —WILLIAM JAMES
Education’s purpose is to replace an empty mind with an open one. —MALCOLM FORBES
N
`;

// Programmatically create data for JSON-server
module.exports = function () {
    let _ = require('lodash');
    // Split txt using delimiters, map strings composing objects, return this map
    let arrayOfStrings = _.split(q, '\nN\n');
    let arrayOfObjectifiedStrings = _.map(arrayOfStrings, quote => {return {quote} });
    return { arrayOfObjectifiedStrings };
};

