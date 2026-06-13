(() => {

    function registerGoalCommands() {

        CommandRegistry.register(

            "goalcreate",

            payload => {

                if (!payload.title) {

                    return {

                        success: false,

                        error:
                            "Goal title is required"
                    };
                }

                const goal =
                    GoalManager
                    .createGoal(

                        payload.title,

                        payload.priority || 5
                    );

                return {

                    success: true,

                    goal
                };
            }
        );

        CommandRegistry.register(

            "goallist",

            () => ({

                success: true,

                goals:
                    GoalManager
                    .listGoals()
            })
        );

        CommandRegistry.register(

            "goalactive",

            () => ({

                success: true,

                goals:
                    GoalManager
                    .getActiveGoals()
            })
        );

        CommandRegistry.register(

            "goalcompleted",

            () => ({

                success: true,

                goals:
                    GoalManager
                    .getCompletedGoals()
            })
        );

        CommandRegistry.register(

            "goalcomplete",

            payload => ({

                success:
                    GoalManager
                    .completeGoal(
                        payload.id
                    )
            })
        );

        CommandRegistry.register(

            "goaldelete",

            payload => ({

                success:
                    GoalManager
                    .deleteGoal(
                        payload.id
                    )
            })
        );

        CommandRegistry.register(

            "goalpriority",

            payload => ({

                success:
                    GoalManager
                    .updatePriority(

                        payload.id,

                        payload.priority
                    )
            })
        );

        CommandRegistry.register(

            "goalstats",

            () => ({

                success: true,

                stats:
                    GoalManager
                    .getStats()
            })
        );

        CommandRegistry.register(

            "topgoal",

            () => ({

                success: true,

                goal:
                    GoalManager
                    .getTopGoal()
            })
        );
    }

    registerGoalCommands();

})();
